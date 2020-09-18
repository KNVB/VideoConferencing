class MeetingManager
{
	constructor(){
		let meetingList={},userList={},approvalRequestList={};
		const { v4: uuidv4 } = require('uuid');
		const util=require("./Utility.js");
		this.authMeeting=((reqBody)=>{
			//console.log(Object.keys(meetingList).includes(reqBody.meetingId));
			if (Object.keys(meetingList).includes(reqBody.meetingId)){
				var meeting=meetingList[reqBody.meetingId];
				if (meeting.getPassword()==reqBody.meetingPwd){
					var tempId=uuidv4();
					tempId="*"+tempId;
					return {"tempId":tempId};
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
		this.getMemberList=((reqBody)=>{
			var meeting;
			try{
				meeting=meetingList[reqBody.meetingId];
				return meeting.getMemberList(reqBody.user);
			}catch (error){
				if (meeting===undefined){
					var err = new Error('Invalid Meeting Id');
					err.badRequest=true;
					throw err;
				} else {
					throw error;
				}
			}
		});
		this.initMeeting=((reqBody)=>{
			var user =new(require('../classes/User'));
			var meeting=new(require('../classes/Meeting'));
			var userId=uuidv4(),meetingId=uuidv4();
			user.id=userId;
			user.isHost=true;
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
		this.setSocket=(socket=>{
			socket.on("login",(info,callBack)=>{
				var meeting;
				console.log("login");
				console.log("info="+JSON.stringify(info));
				console.log("uid="+info.user.id);
				try{
					meeting=meetingList[info.meetingId];
					meeting.getMemberList(info.user.id);
					meeting.updateSocketId(info.user.id,socket.id);
					callBack({error:0,memberList:meeting.getMemberList(info.user)});
				}catch (error){
					//console.log(error);
					if (meeting===undefined){
						callBack({"error":1,message:'Invalid Meeting Id'});
					} else {
						callBack({"error":1,message:error.message});
					}
				}
			});
			socket.on("leaveMeeting",info=>{
				var user=userList[info.userId];
				var meeting=meetingList[info.meetingId];
				if (Object.keys(meetingList).includes(info.meetingId)){
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
				}
			});
			
		});
	}
}
module.exports = MeetingManager;