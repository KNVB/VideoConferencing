class Meeting{
	constructor(){
		var hostUser;
		var meetingId;
		var userList={};
		var meetingPwd;
		var pendingJoinReq={};
		const { v4: uuidv4 } = require('uuid');
		const util=require("../utils/Utility.js");
		this.acceptJoinReq=((info,socket)=>{
			var user=pendingJoinReq[info.userId];
			user.id=info.userId.replace(/^\*/,"");
			this.join(user);
			delete pendingJoinReq[info.userId];
			socket.to(user.socketId).emit("joinReqResult",{error:0,"user":user,"meetingId":info.meetingId});
		});
		this.broadcastMessage=((message,io)=>{
			io.in(meetingId).emit("broadcastMessage", message);
		});
		this.cancelJoinReq=((info,socket)=>{
			var user=pendingJoinReq[info.joinReqId];
			socket.to(hostUser.socketId).emit("cancelJoinReq",user);
			delete pendingJoinReq[info.userId];
		});
		this.close=(()=>{
			
		});
		this.getHostUser=(()=>{
			return hostUser;
		});
		this.getJoinReqId=((info)=>{
			if (info.meetingPwd===meetingPwd){
				var joinReqId=uuidv4();
				joinReqId="*"+joinReqId;
				return joinReqId;
			} else {
				var err = new Error('Invalid Meeting Password');
				err.unauthorized=true;
				throw err;
			}
		});
		this.getMeetingId=(()=>{
			return meetingId;
		});
		this.getUserCount=(()=>{
			return Object.keys(userList).length;
		});	
		
		this.getPassword=(()=>{
			return meetingPwd;
		});
		this.hasUser=(userId=>{
			return Object.keys(userList).includes(userId)
		})
		this.isHost=((user)=>{
			return (user.id===hostUser.id)	
		});
		this.join=((user)=>{
			userList[user.id]=user;
			userList[user.id]["isHost"]=false;
		});
		this.leave=((info,socket)=>{
			if (this.hasUser(info.userId)){
				var user=userList[info.userId];
				delete userList[info.userId];
				socket.to(meetingId).emit("userLeft",user);
				socket.leave(meetingId);
				console.log('User '+user.alias+" left the meeting :"+info.meetingId+" @"+util.getTimeString());
			} else {
				var err = new Error('This user is not belong to this meeting.');
				err.unauthorized=true;
				throw err;
			}
		});
		this.login=((userId,socket)=>{
			if (this.hasUser(userId)){
				var result={};
				socket.join(meetingId);
				Object.keys(userList).forEach(userId=>{
					var user=userList[userId];
					result[user.id]={"alias":user.alias,"id":user.id,"isHost":user.isHost};
				});
				var user=userList[userId];
				user.socketId=socket.id;
				socket.to(meetingId).emit("newUserJoin",{"alias":user.alias,"id":user.id,"isHost":user.isHost});
				console.log('User '+user.alias+" login the meeting :"+meetingId+" @"+util.getTimeString());
				return result;
			} else {
				var err = new Error('This user cannot login this meeting.');
				err.unauthorized=true;
				throw err;
			}
		});
		this.rejectJoinReq=((info,socket)=>{
			var user=pendingJoinReq[info.userId];
			//console.log("info="+JSON.stringify(info));
			//console.log("pendingJoinReq="+JSON.stringify(pendingJoinReq));
			socket.to(user.socketId).emit("joinReqResult",{error:1,message:"The host rejects your join meeting request."});
			delete pendingJoinReq[info.userId];
		});
		this.sendMsg=((info,io)=>{
			var user=userList[info.userId];
			io.in(meetingId).emit("receiveMsg",{"userId":user.id,alias:user.alias,"msg":info.msg});
		});
		this.setHostUser=((user)=>{
			hostUser=user;
			userList[user.id]=user;
			userList[user.id]["isHost"]=true;
		});
		this.setMeetingId=((id)=>{
			meetingId=id;
		});
		this.setPassword=((pwd)=>{
			meetingPwd=pwd;
		});
		this.submitJoinReq=((info,socket)=>{
			if (info.meetingPwd===meetingPwd){
				var user =new(require('../classes/User'));
				user.alias=info.alias;
				user.id=info.joinReqId;
				user.isHost=false;						
				user.socketId=socket.id;
				user.shareMedia={"video":info.shareVideo,"audio":info.shareAudio};
				pendingJoinReq[user.id]=user;
				socket.to(hostUser.socketId).emit("joinRequest",{"alias":info.alias,"id":info.joinReqId});
				//console.log("joinRequest");
			} else {
				var err = new Error('Invalid Meeting Password');
				err.unauthorized=true;
				throw err;
			}				
		});
//===============================================================		

	}
}
module.exports = Meeting;