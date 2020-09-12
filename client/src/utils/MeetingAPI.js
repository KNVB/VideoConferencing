import config from './config';
import io from 'socket.io-client';

class MeetingAPI {
    constructor(){
        var SOCKET_IO_URL='http://' + config.API_HOST + ':' + String(config.API_PORT)+"/";
        var SOCKET_URL=config.SOCKET_URL|| SOCKET_IO_URL;
        this.socket=null;
        this.connect=()=>{
            this.socket=io.connect(SOCKET_URL);
            this.socket.on("new_member",userObj=>{
                console.log("new member "+userObj.alias);
            });
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