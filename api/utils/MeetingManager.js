class MeetingManager
{
	constructor(){
		let meetingList={},userList={},approvalRequestList={};
		const { v4: uuidv4 } = require('uuid');
		const util=require("./Utility.js");
		this.getJoinReqId=((reqBody)=>{
			var meeting;
			try{
				console.log(reqBody.meetingId);
				meeting=meetingList[reqBody.meetingId];
				return ({joinReqId:meeting.getJoinReqId(reqBody)});
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
		/*
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
		});*/
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
			
			socket.on("getJoinReqId",(info,callBack)=>{
				//console.log("getJoinReqId");
				var meeting;
				try{
					//console.log(info.meetingId);
					meeting=meetingList[info.meetingId];
					callBack ({"error":0,joinReqId:meeting.getJoinReqId(info)});
				}catch (error){
					if (meeting===undefined){
						callBack({"error":1,message:'Invalid Meeting Id'});
					} else {
						callBack({"error":1,message:error.message});
					}
				}
			});
			
			
			
			socket.on("login",(info,callBack)=>{
				var meeting;
				try{
					meeting=meetingList[info.meetingId];
					var memberList=meeting.login(info.user.id,socket);
					callBack({error:0,"memberList":memberList});
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
			socket.on("rejectJoinRequest",(info,callBack)=>{
				var meeting;
				try{
					meeting=meetingList[joinReq.meetingId];
					meeting.rejectJoinReq(joinReq,socket);
					callBack({"error":0});
				}catch (error){
					if (meeting===undefined){
						callBack({"error":1,message:'Invalid Meeting Id'});
					} else {
						callBack({"error":1,message:error.message});
					}
				}
			});
			socket.on("submitJoinReq",(joinReq,callBack)=>{
				var meeting;
				try{
					meeting=meetingList[joinReq.meetingId];
					meeting.submitJoinReq(joinReq,socket);
					callBack({"error":0,message:"The Join Request submitted."});
				}catch (error){
					if (meeting===undefined){
						callBack({"error":1,message:'Invalid Meeting Id'});
					} else {
						callBack({"error":1,message:error.message});
					}
				}
			})
		});
	}
}
module.exports = MeetingManager;