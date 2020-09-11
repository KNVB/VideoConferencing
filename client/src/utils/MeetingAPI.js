import config from './config';
import io from 'socket.io-client';

class MeetingAPI {
    constructor(){
        var SOCKET_IO_URL='http://' + config.API_HOST + ':' + String(config.API_PORT)+"/meetingAPI/";
        var SOCKET_URL=config.SOCKET_URL|| SOCKET_IO_URL;
        this.socket=null;
        this.connect=()=>{
            this.socket=io.connect(SOCKET_URL);
        }
        this.connectMeeting=(meetingId,userId)=>{
            console.log(meetingId,userId,this.socket);
            this.socket.emit("connectMeeting",{"meetingId":meetingId,"userId":userId});
        }
    }
}
export default MeetingAPI;