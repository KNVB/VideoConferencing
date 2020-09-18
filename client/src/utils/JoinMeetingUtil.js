import config from './config';
import io from 'socket.io-client';
class JoinMeetingUtil{
    constructor(){
        var SOCKET_IO_URL='http://' + config.API_HOST + ':' + String(config.API_PORT)+"/";
        var SOCKET_URL=config.SOCKET_URL|| SOCKET_IO_URL;

        this.socket=io.connect(SOCKET_URL);
        
        this.disconnect=()=>{
            this.socket.disconnect();
        }
        this.getJoinReqId=(joinReq,callBack)=>{
            this.socket.emit("getJoinReqId",
                            joinReq,
                            callBack)
        }   
    }
}
export default JoinMeetingUtil;