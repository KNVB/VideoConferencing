import config from './config';
import io from 'socket.io-client';
class JoinMeetingUtil{
    constructor(){
        const SOCKET_IO_URL='http://' + config.API_HOST + ':' + String(config.API_PORT)+"/";
        const SOCKET_URL=config.SOCKET_URL|| SOCKET_IO_URL;
        this.joinReqResultHandlder=null;
        this.socket=io.connect(SOCKET_URL);
        this.cancelJoinReq=(joinReq)=>{
            this.socket.emit("cancelJoinReq",
                            joinReq,
                            (result)=>{
                                console.log(result);
                            });
        }
        this.disconnect=()=>{
            this.socket.disconnect();
        }
        this.getJoinReqId=(joinReq,callBack)=>{
            this.socket.emit("getJoinReqId",
                            joinReq,
                            callBack)
        }
        
        this.socket.on("joinReqResult",result=>{
            this.joinReqResultHandlder(result);
        })
        this.submitJoinReq=(joinReq,callBack)=>{
            this.socket.emit("submitJoinReq",
                            joinReq,
                            callBack);
        }   
    }
}
export default JoinMeetingUtil;