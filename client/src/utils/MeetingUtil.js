import config from './config';
import io from 'socket.io-client';

class MeetingUtil {
    constructor(meetingId,user){
        const SOCKET_IO_URL='http://' + config.API_HOST + ':' + String(config.API_PORT)+"/";
        const SOCKET_URL=config.SOCKET_URL|| SOCKET_IO_URL;
        const socket=io.connect(SOCKET_URL);
        const thisMeetingId=meetingId;
        const thisUser=user;

        this.joinReqHandler=null;
        this.receiveMsgHandler=null;
        this.resetRemoteStreamHandler=null;
        this.userJoinHandler=null;
        this.userLeftHandler=null;
        this.acceptJoinRequest=(reqId,callBack)=>{
            socket.emit("acceptJoinRequest",
                        {"meetingId":thisMeetingId,"userId":reqId},
                        (result)=>{
                            callBack(result);
                        });
        }
        this.endMeeting=()=>{
            this.socket.emit("endMeeting",
                            {"meetingId":thisMeetingId,"userId":thisUser.id},
                            (result)=>{
                                console.log(result);
                            });
            this.socket.disconnect();
            sessionStorage.clear();
        }
        this.login=(callBack)=>{
            socket.emit("login",
                            {"meetingId":thisMeetingId,"user":thisUser},
                            (result)=>{
                                callBack(result);
                            });
        }
        this.leaveMeeting=()=>{
            socket.emit("leaveMeeting",
                            {"meetingId":thisMeetingId,"userId":thisUser.id},
                            (result)=>{
                                console.log(result);
                            });
            socket.disconnect();
            sessionStorage.clear();
        }
        this.rejectJoinRequest=(reqId,callBack)=>{
            socket.emit("rejectJoinRequest",
                        {"meetingId":thisMeetingId,"userId":reqId},
                        (result)=>{
                            callBack(result);
                        });
        }
        this.resetRemoteStream=(callBack)=>{
            socket.emit("resetRemoteStream",
                        {"meetingId":thisMeetingId,"userId":thisUser.id},
                        (result)=>{
                            callBack(result);
                        })
        }
        this.sendMsg=(msg,callBack)=>{
            socket.emit("sendMsg",
                        {"meetingId":thisMeetingId,"userId":thisUser.id,"msg":msg},
                        (result)=>{
                            callBack(result);
                        })
        }        
//===================================================================================================
        socket.on("cancelJoinReq",joinReq=>{
            console.log("Cancel Join Request:"+JSON.stringify(joinReq));
            if (this.cancelJoinReqHandler)
                this.cancelJoinReqHandler(joinReq);            
        })
        socket.on("joinRequest",joinReq=>{
            console.log("MeetingUtil.joinRequest,joinReq="+JSON.stringify(joinReq));
            if (this.joinReqHandler)
                this.joinReqHandler(joinReq);
        });
        socket.on("receiveMsg",info=>{
            console.log("MeetingUtil receive message:"+JSON.stringify(info))
            if (this.receiveMsgHandler)
                this.receiveMsgHandler(info);
            
        });
        socket.on("resetRemoteStream",info=>{
            console.log("MeetingUtil receives resetRemoteStream event:"+JSON.stringify(info));
            if (this.resetRemoteStreamHandler)
                this.resetRemoteStreamHandler(info);
        });
        socket.on("userJoin",user=>{
            console.log(user.alias+" join the meeting");
            if (this.userJoinHandler)
                this.userJoinHandler(user);
        });
        socket.on("userLeft",user=>{
            console.log(user.alias+" left the meeting");
            if (this.userLeftHandler)
                this.userLeftHandler(user);            
        });
    }
}
export default MeetingUtil;
