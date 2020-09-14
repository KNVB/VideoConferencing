import config from './config';
import fetchApi from '../utils/fetch';
import io from 'socket.io-client';

class MeetingAPI {
    constructor(){
        var SOCKET_IO_URL='http://' + config.API_HOST + ':' + String(config.API_PORT)+"/";
        var SOCKET_URL=config.SOCKET_URL|| SOCKET_IO_URL;
        this.memberJoinHandler=null;
        this.memberLeftHandler=null;
        this.socket=null;
        this.connect=()=>{
            this.socket=io.connect(SOCKET_URL);
            this.socket.on("member_join",user=>{
                this.memberJoinHandler(user);
            });
            this.socket.on('member_left',user=>{
                this.memberLeftHandler(user);
            })
/*
            this.socket.on("member_list",memberList=>{
                console.log("member list"+memberList);
            })
*/
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
        this.setMemberJoinHandler=(handler)=>{
            this.memberJoinHandler=handler;
        }
        this.setMemberLeftHandler=(handler)=>{
            this.memberLeftHandler=handler;
        }
    }
}
export default MeetingAPI;