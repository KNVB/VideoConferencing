import LocalStreamManager from './LocalStreamManager';
import MeetingUtil from "./MeetingUtil";
class MeetingControl{
    constructor(meetingInfo){
        var cancelJoinReqHandler=new Map();
        var joinReqHandler=new Map();
        var leaveMeetingHandler=new Map();        
        var localStreamUpdateHandler=new Map();
        var meetingCloseHandler=new Map();
        
        var receiveMsgHandler=new Map();
        var resetRemoteStreamHandler=new Map();
        var userLeftHandler=new Map();
        var userJoinHandler=new Map();
        var userJoinReqHandler=new Map();

        const localStreamManager=new LocalStreamManager();
        const meetingId=meetingInfo.meetingId;
        const meetingUtil=new MeetingUtil(meetingId,meetingInfo.user);
        
        this.localStream=null;
        
        this.userList={};
        var user=meetingInfo.user;
//=============================================================================================
        this.addCancelJoinReqHandler=(methodName,handler)=>{
            cancelJoinReqHandler[methodName]=handler;
        }
        this.addJoinReqHandler=(methodName,handler)=>{
            joinReqHandler[methodName]=handler;
        }
        this.addLeaveMeetingHandler=(methodName,handler)=>{
            leaveMeetingHandler[methodName]=handler;
        }
        this.addLocalStreamUpdateHandler=(methodName,handler)=>{
            localStreamUpdateHandler[methodName]=handler;
        }
        this.addMeetingCloseHandler=(methodName,handler)=>{
            meetingCloseHandler[methodName]=handler;
        }
        this.addReceiveMsgHandler=(methodName,handler)=>{
			receiveMsgHandler[methodName]=handler;
		}	
        this.addResetRemoteStreamHandler=(methodName,handler)=>{
			resetRemoteStreamHandler[methodName]=handler;
		}
        this.addUserLeftHandler=(methodName,handler)=>{
			userLeftHandler[methodName]=handler;
        }		
		this.addUserJoinHandler=(methodName,handler)=>{
			userJoinHandler[methodName]=handler;
		}
		this.addUserJoinReqHandler=(methodName,handler)=>{
			userJoinReqHandler[methodName]=handler;
		}
		this.addResetRemoteStreamHandler=(methodName,handler)=>{
			resetRemoteStreamHandler[methodName]=handler;
		}
		this.addUserLeftHandler=(methodName,handler)=>{
			userLeftHandler[methodName]=handler;
		}
		this.addUserJoinHandler=(methodName,handler)=>{
			userJoinHandler[methodName]=handler;
		}
        this.addUserJoinReqHandler=(methodName,handler)=>{
			userJoinReqHandler[methodName]=handler;
        }
//==================================================================================
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
                console.log(stream);
            })
            .catch(error=>{
                console.log("An error catched by MeetingUtil.");
                throw error
            })
            .finally(()=>{
                console.log("MeetingControl.getLocalStream is called.")
                for (let methodName of localStreamUpdateHandler.keys()){
                    console.log("Calling :"+methodName);
                    localStreamUpdateHandler[methodName](this.localStream);
                }               
            })
        }
        this.login=()=>{
            meetingUtil.login()
            .then((userList)=>{
                this.userList=userList;
                console.log(this.userList);
            })
            .catch(error=>{
                throw(error);
            })            
        }        
    }
}
export default MeetingControl;
