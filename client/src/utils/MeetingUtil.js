import config from './config';
//import fetchApi from './fetch';
import io from 'socket.io-client';
class MeetingUtil {
    constructor(meetingInfo){
        var SOCKET_IO_URL='http://' + config.API_HOST + ':' + String(config.API_PORT)+"/";
        var SOCKET_URL=config.SOCKET_URL|| SOCKET_IO_URL;
        this.joinReqHandler=[];
        this.meetingId=meetingInfo.meetingId;
        
        this.memberList={};
        this.newMemberJoinHandler=[];
        this.user=meetingInfo.user;
        this.socket=io.connect(SOCKET_URL);
        this.login=(callBack)=>{
            this.socket.emit("login",
            {meetingId:this.meetingId,user:this.user},
            (result)=>{
                if (result.error===0){
                    this.memberList=result.memberList;
                }
                callBack(result);
            });
        }
        this.leaveMeeting=()=>{
            this.socket.emit("leaveMeeting",
                            {"meetingId":this.meetingId,"userId":this.user.id},
                            (result)=>{
                                console.log(result);
                            });
            this.socket.disconnect();
        }
        this.acceptJoinRequest=((meetingId,reqId)=>{
            this.socket.emit("acceptJoinRequest",
                            {"meetingId":this.meetingId,"userId":reqId},
                            (result)=>{
                                console.log(result);
                            });
        });
        this.rejectJoinRequest=(meetingId,reqId)=>{
            this.socket.emit("rejectJoinRequest",
                            {"meetingId":this.meetingId,"userId":reqId},
                            (result)=>{
                                console.log(result);
                            });
        }
        this.socket.on("joinRequest",joinReq=>{
            console.log("joinRequest,joinReq="+JSON.stringify(joinReq));
            this.joinReqHandler.forEach(handler=>{
                handler(joinReq);
            });
        });
        this.socket.on("newMemberJoin",user=>{
            console.log("new member:"+JSON.stringify(user));
            this.memberList[user.id]=user;
            this.newMemberJoinHandler.forEach(handler=>{
                handler(user);
            })
        });

    }
}
export default MeetingUtil;