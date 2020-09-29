import config from './config';
import io from 'socket.io-client';
import LocalStreamManager from './LocalStreamManager';
import Peer from 'peerjs';
class MeetingUtil {
    constructor(meetingInfo){
        var SOCKET_IO_URL='http://' + config.API_HOST + ':' + String(config.API_PORT)+"/";
        var SOCKET_URL=config.SOCKET_URL|| SOCKET_IO_URL;
        
        this.cancelJoinReqHandler=[];
        this.joinReqHandler=[];
        this.leaveMeetingHandler=[];        
        this.meetingCloseHandler=[];
        this.meetingId=meetingInfo.meetingId;
        this.newUserJoinHandler=[];
        this.peer=null;
        this.userList={};
        this.userLeftHandler=[];
        this.userJoinHandler=[];
        this.receiveMsgHandler=[];
        this.localStream=null;
        this.socket=io.connect(SOCKET_URL);
        this.user=meetingInfo.user;
        this.localStreamManager=new LocalStreamManager();
        this.acceptJoinRequest=((meetingId,reqId)=>{
            this.socket.emit("acceptJoinRequest",
                            {"meetingId":this.meetingId,"userId":reqId},
                            (result)=>{
                                console.log(result);
                            });
        });
        this.endMeeting=()=>{
            this.socket.emit("endMeeting",
                            {"meetingId":this.meetingId,"userId":this.user.id},
                            (result)=>{
                                console.log(result);
                            });
            this.socket.disconnect();
        }
        this.leaveMeeting=()=>{
            this.socket.emit("leaveMeeting",
                            {"meetingId":this.meetingId,"userId":this.user.id},
                            (result)=>{
                                console.log(result);
                            });
            this.socket.disconnect();
            this.peer.disconnect();
            this.leaveMeetingHandler.forEach(handler=>{
                handler();
            })
        }
        this.login=(callBack)=>{
            this.socket.emit("login",
            {meetingId:this.meetingId,user:this.user},
            (result)=>{
               // console.log(result);
                if (result.error===0){
                    this.userList=result.userList;
                    this.peer=new Peer(this.user.id,{host:"/",path:"/peerServer",port:config.API_PORT});
                }
                callBack(result);
            });
        }
        this.rejectJoinRequest=(meetingId,reqId)=>{
            this.socket.emit("rejectJoinRequest",
                            {"meetingId":this.meetingId,"userId":reqId},
                            (result)=>{
                                console.log(result);
                            });
        }
        this.sendMsg=(msg)=>{
            this.socket.emit("sendMsg",
                            {"meetingId":this.meetingId,"userId":this.user.id,"msg":msg},
                            (result)=>{
                                console.log(result);
                            })
        }        
//====================================================================================================================        
        this.socket.on("meetingClose",()=>{
            this.meetingCloseHandler.forEach(handler=>{
                handler();
            })
        });
        this.socket.on("cancelJoinReq",joinReq=>{
            console.log("Cancel Join Request:"+JSON.stringify(joinReq));
            delete this.userList[joinReq.id];
            this.cancelJoinReqHandler.forEach(handler=>{
                handler(joinReq);
            });
        })
        this.socket.on("joinRequest",joinReq=>{
            console.log("joinRequest,joinReq="+JSON.stringify(joinReq));
            this.joinReqHandler.forEach(handler=>{
                handler(joinReq);
            });
        });
        this.socket.on("userLeft",user=>{
            console.log(user.alias+" left the meeting");
            delete this.userList[user.id];
            this.userLeftHandler.forEach(handler=>{
                handler(user);
            });
        });
        this.socket.on("newUserJoin",user=>{
            //console.log("new use join user:"+JSON.stringify(user));
            //console.log(this.newUserJoinHandler);
            this.userList[user.id]=user;
            this.newUserJoinHandler.forEach(handler=>{
                handler(user);
            })
        });
        this.socket.on("receiveMsg",info=>{
            this.receiveMsgHandler.forEach(handler=>{
                handler(info);
            })
        });
    }
}
export default MeetingUtil;