import config from './config';
import fetchApi from '../utils/fetch';
import io from 'socket.io-client';

class MeetingAPI {
    constructor(){
        var SOCKET_IO_URL='http://' + config.API_HOST + ':' + String(config.API_PORT)+"/";
        var SOCKET_URL=config.SOCKET_URL|| SOCKET_IO_URL;
        this.socket=null;
        this.connect=()=>{
            this.socket=io.connect(SOCKET_URL);
            this.socket.on("member_join",userObj=>{
                console.log("new member "+userObj.alias);
            });
            this.socket.on('member_left',user=>{
                console.log("member "+user.alias+" left the meeting");
            })
/*
            this.socket.on("member_list",memberList=>{
                console.log("member list"+memberList);
            })
*/
        }
        this.joinMeeting=(meetingId,userId)=>{
            this.socket.emit("joinMeeting",{"meetingId":meetingId,"userId":userId});
        }
        this.leaveMeeting=(meetingId,userId)=>{
            this.socket.emit("leaveMeeting",{"meetingId":meetingId,"userId":userId});
        }
    }
}
export default MeetingAPI;