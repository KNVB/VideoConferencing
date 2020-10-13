import LocalStreamManager from './LocalStreamManager';
import MeetingUtil from "./MeetingUtil";
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
        this.resetRemoteStreamHandler=new Map();
        this.userLeftHandler=new Map();
        this.userJoinHandler=new Map();
        this.userJoinReqHandler=new Map();
//=============================================================================        
        const localStreamManager=new LocalStreamManager(); 
        const meetingUtil=new MeetingUtil(meetingInfo.meetingId,meetingInfo.user);
        
        this.meetingId=meetingInfo.meetingId;
        this.userList={};
        this.user=meetingInfo.user; 
//==================================================================================           
        meetingUtil.joinReqHandler=(joinReq)=>{
            console.log(joinReq);
            console.log("MeetingControl receive join meeting request.");
            Object.keys(this.joinReqHandler).forEach(methodName=>{
                this.joinReqHandler[methodName](joinReq);
                console.log(methodName+" is called.");                
            })
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
                for (let methodName of this.localStreamUpdateHandler.keys()){
                    console.log("Calling :"+methodName);
                    this.localStreamUpdateHandler[methodName](this.localStream);
                }               
            })
        }
        
        this.leaveMeeting=()=>{
            meetingUtil.leaveMeeting();
            Object.keys(this.leaveMeetingHandler).forEach(methodName=>{
                this.leaveMeetingHandler[methodName]();
                console.log(methodName+" is called.");                
            })
        }
        this.login=()=>{
            meetingUtil.login()
            .then((userList)=>{
                this.userList=userList;
                console.log("User "+this.user.alias+" Login Success");
                console.log("User List:"+JSON.stringify(this.userList));
            })
            .catch(error=>{
                throw(error);
            })            
        }
    }    
}
export default MeetingControl;
