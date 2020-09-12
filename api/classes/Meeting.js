class Meeting{
	constructor(){
		var hostUser;
		var meetingId;
		var memberList={};
		var meetingPwd;
		
		this.broadcastMessage=((message)=>{
			
		});
		this.close=(()=>{
			
		});
		this.getMeetingId=(()=>{
			return meetingId;
		});
		this.getMemberCount=(()=>{
			return Object.keys(memberList).length;
		});
		this.getPassword=(()=>{
			return meetingPwd;
		});
		this.isHost=((user)=>{
			return (user.id===hostUser.id)	
		});
		this.join=((user)=>{
			memberList[user.id]=user;
		});
		this.leave=((user)=>{
			delete memberList[user.id];
		});
		this.setHostMember=((user)=>{
			hostUser=user;
			this.join(user);
		});
		this.setMeetingId=((id)=>{
			meetingId=id;
		});
		this.setPassword=((pwd)=>{
			meetingPwd=pwd;
		});
//===============================================================		

	}
}
module.exports = Meeting;