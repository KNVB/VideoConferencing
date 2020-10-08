import config from './config';
import io from 'socket.io-client';
import LocalStreamManager from './LocalStreamManager';
class MeetingUtil {
    constructor(meetingInfo){
        var SOCKET_IO_URL='http://' + config.API_HOST + ':' + String(config.API_PORT)+"/";
        var SOCKET_URL=config.SOCKET_URL|| SOCKET_IO_URL;
        
        this.cancelJoinReqHandler=[];
        this.joinReqHandler=[];
        this.leaveMeetingHandler=[];        
        this.localStreamUpdateHandler=[];
        this.meetingCloseHandler=[];
        this.newUserJoinHandler=[];
        this.receiveMsgHandler=[];
        this.remoteStreamUpdateHandler=[];
        this.userLeftHandler=[];
        this.userJoinHandler=[];

        this.meetingId=meetingInfo.meetingId;
        this.peer=null;
        this.userList={};
        
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
        this.getLocalStream=async (shareVideo,shareAudio)=>{
            this.localStream=null;
            try{
                this.localStream=await this.localStreamManager.getMediaStream(shareVideo,shareAudio);
            } catch(error){
                throw(error);
            }finally{
                this.localStreamUpdateHandler.forEach(handler=>{
                    handler(this.localStream);
                })
                this.socket.emit("userStreamUpdated",
                                {"meetingId":this.meetingId,"userId":this.user.id},
                                (result)=>{
                                    console.log(result);
                                });
                return this.localStream;
            }            
        }
        this.leaveMeeting=()=>{
            this.socket.emit("leaveMeeting",
                            {"meetingId":this.meetingId,"userId":this.user.id},
                            (result)=>{
                                console.log(result);
                            });
            this.socket.disconnect();
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
        this.socket.on("userLeft",user=>{
            console.log(user.alias+" left the meeting");
            delete this.userList[user.id];
            this.userLeftHandler.forEach(handler=>{
                handler(user);
            });
        });
        this.socket.on("remoteStreamUpdated",info=>{
            this.remoteStreamUpdateHandler.forEach(handler=>{
                handler(info.userId);
            })
        });
        
    }
}
export default MeetingUtil;