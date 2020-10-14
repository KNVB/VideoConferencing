import LocalStreamManager from './LocalStreamManager';
import MeetingUtil from "./MeetingUtil";
import RemoteStreamManager from './RemoteStreamManager';
class MeetingControl{
    constructor(meetingInfo){
/*=========================================================================*
 *    Event Handler                                                        *                         
 *=========================================================================*/            
        this.cancelJoinReqHandler=new Map();
        this.joinReqHandler=new Map();
        this.leaveMeetingHandler=new Map();        
        this.localStreamUpdateHandler=new Map();
        this.meetingCloseHandler=new Map();
        this.receiveMsgHandler=new Map();
        this.remoteStreamHandler=new Map();
        this.resetRemoteStreamHandler=new Map();
        this.userLeftHandler=new Map();
        this.userJoinHandler=new Map();
        this.userJoinReqHandler=new Map();
//=============================================================================        
        const localStreamManager=new LocalStreamManager(); 
        const meetingUtil=new MeetingUtil(meetingInfo.meetingId,meetingInfo.user);
        const remoteStreamManager=new RemoteStreamManager();
        this.meetingId=meetingInfo.meetingId;
        this.userList={};
        this.user=meetingInfo.user; 
//==================================================================================           
        meetingUtil.cancelJoinReqHandler=(joinReq)=>{
            console.log("MeetingControl receive join meeting cancellation."); 
            //console.log(joinReq);
            delete this.userList[joinReq.id];
            Object.keys(this.cancelJoinReqHandler).forEach(methodName=>{
                this.cancelJoinReqHandler[methodName](joinReq);
                console.log(methodName+" is called.");
            })
        }
        meetingUtil.joinReqHandler=(joinReq)=>{
            //console.log(joinReq);
            console.log("MeetingControl receive join meeting request.");
            this.userList[joinReq.id]=joinReq;
            Object.keys(this.joinReqHandler).forEach(methodName=>{
                this.joinReqHandler[methodName](joinReq);
                console.log(methodName+" is called.");
            })
        }
        meetingUtil.receiveMsgHandler=(info)=>{
            console.log("MeetingControl receive message:"+JSON.stringify(info))
            Object.keys(this.receiveMsgHandler).forEach(methodName=>{
                this.receiveMsgHandler[methodName](info);
                console.log(methodName+" is called.");
            })
        }
        meetingUtil.resetRemoteStreamHandler=(info)=>{
            console.log("MeetingControl receives resetRemoteStream event:"+JSON.stringify(info));
            Object.keys(this.resetRemoteStreamHandler).forEach(methodName=>{
                this.resetRemoteStreamHandler[methodName](info);
                console.log(methodName+" is called.");
            });
            if (this.localStream)
                remoteStreamManager.sendStreamToUser(this.userList[info.userId],this.localStream);
        }
        meetingUtil.userJoinHandler=(user)=>{
            console.log("MeetingControl receive user join meeting event.");
            this.userList[user.id]=user;
            Object.keys(this.userJoinHandler).forEach(methodName=>{
                this.userJoinHandler[methodName](user);
                console.log(methodName+" is called.");
            });
        }    
        meetingUtil.userLeftHandler=(user)=>{
            console.log("MeetingControl receive user left meeting event.");
            delete this.userList[user.id];
            Object.keys(this.userLeftHandler).forEach(methodName=>{
                this.userLeftHandler[methodName](user);
                console.log(methodName+" is called.");
            })    
        }
        remoteStreamManager.remoteStreamHandler=(metadata,stream)=>{
            console.log("MeetingControl receive a stream from "+metadata.alias);
            Object.keys(this.remoteStreamHandler).forEach(methodName=>{
                this.remoteStreamHandler[methodName](metadata,stream);
                console.log(methodName+" is called.");
            });
        }
//==================================================================================
        this.acceptJoinRequest=(reqId,callBack)=>{        
            meetingUtil.acceptJoinRequest(reqId,(result=>{
                console.log("Accept join Request result="+JSON.stringify(result));                
                delete this.userList[reqId];
                callBack(result);
            }));
        };    
        this.getLocalStream=async (shareVideo,shareAudio)=>{
            if (this.localStream){
                this.localStream.getTracks().forEach(async track=>{
                    await track.stop();
                })
                this.localStream=null;
            }
            await localStreamManager.getMediaStream(shareVideo,shareAudio)
            .then (stream=>{
                this.localStream=stream;
                //console.log(stream);
            })
            .catch(error=>{
                console.log("An error catched by MeetingUtil.");
                throw error
            })
            .finally(()=>{
                console.log("MeetingControl.getLocalStream is called.")
                Object.keys(this.localStreamUpdateHandler).forEach(methodName=>{
                    console.log("Calling :"+methodName);
                    this.localStreamUpdateHandler[methodName](this.localStream);
                });
                this.sendLocalStreamToOthers();
            })
        }        
        this.leaveMeeting=()=>{
            console.log(this.user.alias+" leave the meeting");
            meetingUtil.leaveMeeting();
            Object.keys(this.leaveMeetingHandler).forEach(methodName=>{
                this.leaveMeetingHandler[methodName]();
                console.log(methodName+" is called.");                
            });
            if (this.localStream)
                localStreamManager.closeStream(this.localStream);
            remoteStreamManager.disconnect();    
        }
        this.login=(callBack)=>{
            meetingUtil.login(result=>{
                if (result.error===0){
                    this.userList=result.userList;
                    console.log("User "+this.user.alias+" Login Success");
                    console.log("User List:"+JSON.stringify(this.userList));
                    remoteStreamManager.connect(this.user);
                }
                callBack(result);
            });
        }
        this.rejectJoinRequest=(reqId,callBack)=>{
            meetingUtil.rejectJoinRequest(reqId,(result=>{
                //console.log("Reject join Request result="+JSON.stringify(result));
                delete this.userList[reqId];
                callBack(result);
            }));
        }
        this.sendLocalStreamToOthers=()=>{
            console.log("MeetingControl.sendLocalStreamToOthers is called");
            if (this.localStream){
                remoteStreamManager.sendStreamToAllUser(this.userList,this.user,this.localStream);
            }else {
                remoteStreamManager.localStream=null;
                meetingUtil.resetRemoteStream(result=>{
                    console.log("MeetingUtil.resetRemoteStream is called.");
                    console.log(result);
                });
            }
        }
        this.sendMsg=(msg,callBack)=>{
            meetingUtil.sendMsg(msg,(result=>{
                callBack(result);
            }))
        }
    }    
}
export default MeetingControl;
