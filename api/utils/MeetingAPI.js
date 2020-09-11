module.exports=function(socket){
	socket.on("connectMeeting",info=>{
		console.log(info.meetingId,info.userId);
	});
}