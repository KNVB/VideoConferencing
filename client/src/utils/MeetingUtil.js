import config from './config';
import io from 'socket.io-client';

class MeetingUtil {
    constructor(meetingId,user){
        const SOCKET_IO_URL='http://' + config.API_HOST + ':' + String(config.API_PORT)+"/";
        const SOCKET_URL=config.SOCKET_URL|| SOCKET_IO_URL;
        const socket=io.connect(SOCKET_URL);
        const thisMeetingId=meetingId;
        const thisUser=user;
        
        this.joinReqHandler=null;
        this.login=()=>{
            return new Promise((resolve, reject) => {
                socket.emit("login",
                            {"meetingId":thisMeetingId,"user":thisUser},
                            (result)=>{
                                if (result.error===0){
                                    resolve(result.userList);
                                } else {
                                    reject(result);
                                }
                            });
            })
        }
        this.leaveMeeting=()=>{
            socket.emit("leaveMeeting",
                            {"meetingId":thisMeetingId,"userId":thisUser.id},
                            (result)=>{
                                console.log(result);
                            });
            socket.disconnect();
        }
//===================================================================================================
        socket.on("joinRequest",joinReq=>{
            console.log("MeetingUtil.joinRequest,joinReq="+JSON.stringify(joinReq));
            if (this.joinReqHandler)
                this.joinReqHandler(joinReq);
        });
    }
}
export default MeetingUtil;
