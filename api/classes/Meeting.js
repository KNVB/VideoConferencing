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
		this.getHostUser=(()=>{
			return hostUser;
		});
		this.getMeetingId=(()=>{
			return meetingId;
		});
		this.getMemberCount=(()=>{
			return Object.keys(memberList).length;
		});
		this.getMemberList=(()=>{
			var result={};
			Object.keys(memberList).forEach(memberId=>{
				var member=memberList[memberId];
				result[member.id]={"alias":member.alias,"id":member.id,"isHost":member.isHost};
			});
			return result;
		});
		this.getPassword=(()=>{
			return meetingPwd;
		});
		this.hasMember=(userId=>{
			return Object.keys(memberList).includes(userId);
		});
		this.isHost=((user)=>{
			return (user.id===hostUser.id)	
		});
		this.join=((user)=>{
			memberList[user.id]=user;
			memberList[user.id]["isHost"]=false;
		});
		this.leave=((user)=>{
			delete memberList[user.id];
		});
		this.setHostMember=((user)=>{
			hostUser=user;
			memberList[user.id]=user;
			memberList[user.id]["isHost"]=true;
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