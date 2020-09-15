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
			if (reqBody){
				var meetingId=reqBody.meetingId;
				var userId=reqBody.user.id;
				
				if (Object.keys(meetingList).includes(meetingId)){
					if (Object.keys(userList).includes(userId)){
						var meeting=meetingList[meetingId];
						if (meeting.hasMember(userId)) {
							return meeting.getMemberList();
						} else {
							var err = new Error('This user cannot access this meeting.');
							err.unauthorized=true;
							throw err;
						}
					} else {
						var err = new Error('Invalid User Id');
						err.badRequest=true;
						throw err;
					}
				} else {
					var err = new Error('Invalid Meeting Id');
					err.badRequest=true;
					throw err;
				}
			} else {
				var err = new Error('Invalid Meeting Info');
				err.badRequest=true;
				throw err;
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
			socket.on("approveRequest",(info,callBack)=>{
				console.log("approveRequest:"+JSON.stringify(info));
				if (Object.keys(meetingList).includes(info.meetingId)){
					var user=approvalRequestList[info.userId];
					var meeting=meetingList[info.meetingId];

					user.id=info.userId.replace(/^\*/,"");
					userList[user.id]=user;
					meeting.join(user);
					socket.to(user.socketId).emit("approvalResult",{error:0,"user":user,"meetingId":info.meetingId});
				}
				delete approvalRequestList[info.userId];
			});
			socket.on("cancelApprovalReq",info=>{
				/*
				console.log("cancelApprovalReq");
				console.log(info);
				*/
				if (Object.keys(approvalRequestList).includes(info.tempId)&&
					Object.keys(meetingList).includes(info.meetingId)){
					var meeting=meetingList[info.meetingId];
					var user=approvalRequestList[info.tempId];
					var hostUser=meeting.getHostUser();
					approvalRequestList[user.id]=user;
					socket.to(hostUser.socketId).emit("cancelApprovalReq",user);
					delete approvalRequestList[info.tempId];
				}				
			});
			socket.on("joinMeeting",info=>{
				var user=userList[info.userId];
				socket.join(info.meetingId);
				user.socketId=socket.id;
				userList[info.userId]=user;
				console.log('User :'+user.alias+"("+info.userId+") joins the meeting :"+info.meetingId+" @"+util.getTimeString());
				socket.to(info.meetingId).emit('member_join',user);
				//console.log(Object.keys(userList).length);
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
			socket.on("rejectRequest",(info,callBack)=>{
				console.log("rejectRequest:"+JSON.stringify(info));
				if (Object.keys(meetingList).includes(info.meetingId)){
					var user=approvalRequestList[info.userId];
					socket.to(user.socketId).emit("approvalResult",{error:1,message:"The host rejects your join meeting request."});
				}
				delete approvalRequestList[info.userId];
			});
			socket.on("submitApprovalReq",(info,callBack)=>{
				var meeting=meetingList[info.meetingId];
				if (Object.keys(meetingList).includes(info.meetingId)){
					if (meeting.getPassword()===info.meetingPwd){
						callBack({error:0});
						var user =new(require('../classes/User'));
						
						user.alias=info.alias;
						user.id=info.tempId;
						user.isHost=false;						
						user.socketId=socket.id;
						user.shareMedia={"video":info.shareVideo,"audio":info.shareAudio};
						var hostUser=meeting.getHostUser();
						approvalRequestList[user.id]=user;
						socket.to(hostUser.socketId).emit("approvalRequest",user);
					} else {
						callBack({error:1,message:"Invalid Meeting password"})
					}
				} else {
					//socket.to.emit"approvalResult"
					callBack({error:1,message:"Invalid Meeting Id"})
				}
			});
		});
	}
}
module.exports = MeetingManager;