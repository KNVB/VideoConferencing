class MeetingManager
{
	constructor(){
		let meetingList={},userList={};
		const { v4: uuidv4 } = require('uuid');
		const util=require("./Utility.js");
		this.initMeeting=((reqBody)=>{
			var user =new(require('../classes/User'));
			var meeting=new(require('../classes/Meeting'));
			var userId=uuidv4(),meetingId=uuidv4();
			user.id=userId;
			user.alias=reqBody.alias;
			user.shareMedia={"video":reqBody.shareVideo,"audio":reqBody.shareAudio};
			meeting.setMeetingId(meetingId);
			meeting.setHostMember(user);
			meeting.setPassword(reqBody.meetingPwd);
			userList[userId]=user;
			meetingList[meetingId]=meeting;
			console.log("meeting :"+meetingId+" is created @"+util.getTimeString());
			return {"user":user,"meetingId":meetingId};
		});
		this.joinMeeting=((reqBody)=>{
			
			if (Object.keys(meetingList).includes(reqBody.meetingId)){
				var meeting=meetingList[reqBody.meetingId];
				if (meeting.getPassword()==reqBody.meetingPwd){
					var userId=uuidv4();
					var user =new(require('../classes/User'));
					user.id=userId;
					user.alias=reqBody.alias;
					user.shareMedia={"video":reqBody.shareVideo,"audio":reqBody.shareAudio};
					userList[userId]=user;
					meeting.join(user);
					meetingList[reqBody.meetingId]=meeting;
					return {"user":user,"meetingId":reqBody.meetingId};
				} else {
					var err = new Error('Invalid Meeting Password');
					err.unauthorized=true;
					throw err;
				}
			} else {
				var err = new Error('Invalid Meeting Id');
				err.badRequest=true;
				throw err;
			}			
		});
		this.setSocket=(socket=>{
			
			socket.on("joinMeeting",info=>{
				var user=userList[info.userId];
				socket.join(info.meetingId);
				user.socketId=socket.id;
				userList[info.userId]=user;
				console.log('User :'+user.alias+"("+info.userId+") joins the meeting :"+info.meetingId+" @"+util.getTimeString());
				socket.to(info.meetingId).emit('member_join',user);
				console.log(Object.keys(userList).length);
			});
			socket.on("leaveMeeting",info=>{
				var user=userList[info.userId];
				var meeting=meetingList[info.meetingId];
				
				meeting.leave(user);
				delete userList[info.userId];
				console.log('User '+user.alias+" left the meeting :"+info.meetingId+" @"+util.getTimeString());
				socket.to(info.meetingId).emit('member_left',user);
				socket.leave(info.meetingId);
				socket.disconnect();
				console.log("Member count in room "+info.meetingId+" = "+Object.keys(userList).length);
				if (meeting.getMemberCount()==0){
					delete meetingList[info.meetingId];
					console.log("meeting :"+info.meetingId+" is destroyed @"+util.getTimeString());
				}
			});
		});
	}
}
module.exports = MeetingManager;