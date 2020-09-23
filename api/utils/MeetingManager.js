class MeetingManager
{
	constructor(){
		let meetingList={};
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
		this.initMeeting=((reqBody)=>{
			var user =new(require('../classes/User'));
			var meeting=new(require('../classes/Meeting'));
			var userId=uuidv4(),meetingId=uuidv4();
			user.id=userId;
			user.isHost=true;
			user.alias=reqBody.alias;
			user.shareMedia={"video":reqBody.shareVideo,"audio":reqBody.shareAudio};
			meeting.setMeetingId(meetingId);
			meeting.setHostUser(user);
			meeting.setPassword(reqBody.meetingPwd);
			meetingList[meetingId]=meeting;
			console.log("meeting :"+meetingId+" is created @"+util.getTimeString());
			return {"user":user,"meetingId":meetingId};
		});
		this.setSocket=((io,socket)=>{
			socket.on("acceptJoinRequest",(info,callBack)=>{
				var meeting;
				try{
					//console.log("acceptJoinReq:"+JSON.stringify(info));
					meeting=meetingList[info.meetingId];
					meeting.acceptJoinReq(info,socket);
					callBack({"error":0});
				}catch (error){
					if (meeting===undefined){
						callBack({"error":1,message:'Invalid Meeting Id'});
					} else {
						callBack({"error":1,message:error.message});
					}
				}
			});
			socket.on("cancelJoinReq",(info,callBack)=>{
				var meeting;
				try{
					//console.log(info.meetingId);
					meeting=meetingList[info.meetingId];
					meeting.cancelJoinReq(info,socket);
					callBack ({"error":0});
				}catch (error){
					if (meeting===undefined){
						callBack({"error":1,message:'Invalid Meeting Id'});
					} else {
						callBack({"error":1,message:error.message});
					}
				}
			});
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
					var userList=meeting.login(info.user.id,socket);
					callBack({error:0,"userList":userList});
				}catch (error){
					//console.log(error);
					if (meeting===undefined){
						callBack({"error":1,message:'Invalid Meeting Id'});
					} else {
						callBack({"error":1,message:error.message});
					}
				}
			});
			socket.on("leaveMeeting",(info,callBack)=>{
				var meeting;
				try{
					//console.log("leave meeting:"+JSON.stringify(info));
					meeting=meetingList[info.meetingId];
					meeting.leave(info,socket);
					console.log("User count in room "+info.meetingId+" = "+meeting.getUserCount());
					if (meeting.getUserCount()==0){
						delete meetingList[info.meetingId];
						console.log("meeting :"+info.meetingId+" is destroyed @"+util.getTimeString());
					}
					callBack({"error":0});
				}catch (error){
					console.log(error);
					if (meeting===undefined){
						callBack({"error":1,message:'Invalid Meeting Id'});
					} else {
						callBack({"error":1,message:error.message});
					}
				}

			});
			socket.on("rejectJoinRequest",(info,callBack)=>{
				var meeting;
				try{
					console.log("rejectJoinReq:"+JSON.stringify(info));
					meeting=meetingList[info.meetingId];
					meeting.rejectJoinReq(info,socket);
					callBack({"error":0});
				}catch (error){
					if (meeting===undefined){
						callBack({"error":1,message:'Invalid Meeting Id'});
					} else {
						callBack({"error":1,message:error.message});
					}
				}
			});
			socket.on("sendMsg",(info,callBack)=>{
				var meeting;
				try{
					meeting=meetingList[info.meetingId];
					meeting.sendMsg(info,io);
					callBack({"error":0,message:"The message is sent."});
				}catch (error){
					console.log(error);
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