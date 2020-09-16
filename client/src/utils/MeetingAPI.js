import config from './config';
import fetchApi from './fetch';
import io from 'socket.io-client';

class MeetingAPI {
    constructor(){
        var SOCKET_IO_URL='http://' + config.API_HOST + ':' + String(config.API_PORT)+"/";
        var SOCKET_URL=config.SOCKET_URL|| SOCKET_IO_URL;
        this.cancelApprovalReqHandler=null;
        this.memberJoinHandler=null;
        this.memberLeftHandler=null;
        this.approvalRequestHandler=null;
        this.socket=null;
        this.approveRequest=(meetingId,userId)=>{
            this.socket.emit("approveRequest",{"meetingId":meetingId,"userId":userId});
        }
        this.connect=()=>{
            this.socket=io.connect(SOCKET_URL);
            this.socket.on("cancelApprovalReq",user=>{
                this.cancelApprovalReqHandler(user);
            });
            this.socket.on("member_join",user=>{
                this.memberJoinHandler(user);
            });
            this.socket.on('member_left',user=>{
                this.memberLeftHandler(user);
            })
            this.socket.on("approvalRequest",user=>{
                this.approvalRequestHandler(user);
            });
        }
        this.cancelApprovalReq=(approvalReq)=>{
            this.socket.emit("cancelApprovalReq",approvalReq);
        };
        this.disconnect=()=>{
            this.socket.disconnect();
        }
        this.getMemberList=(meetingInfo)=>{
            return fetchApi('/getMemberList','POST',{},meetingInfo,'json');
        }
        this.joinMeeting=(meetingId,userId)=>{
            this.socket.emit("joinMeeting",{"meetingId":meetingId,"userId":userId});
        }
        this.leaveMeeting=(meetingId,userId)=>{
            this.socket.emit("leaveMeeting",{"meetingId":meetingId,"userId":userId});
        }
        this.rejectRequest=(meetingId,userId)=>{
            this.socket.emit("rejectRequest",{"meetingId":meetingId,"userId":userId});
        }
        this.submitApprovalReq=(meetingInfo,approvalResponseHandler)=>{
            this.socket.on("approvalResult",res=>{
                approvalResponseHandler(res);
            })
            
            this.socket.emit("submitApprovalReq",meetingInfo,(res)=>{
                approvalResponseHandler(res);
            });            
        }      
    }
}
export default MeetingAPI;