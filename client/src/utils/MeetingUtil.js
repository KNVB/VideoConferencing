import config from './config';
import io from 'socket.io-client';
class MeetingUtil {
    constructor(meetingId,user){
        const SOCKET_IO_URL='http://' + config.API_HOST + ':' + String(config.API_PORT)+"/";
        const SOCKET_URL=config.SOCKET_URL|| SOCKET_IO_URL;
        const MeetingId=meetingId;
        const User=user;
        const socket=io.connect(SOCKET_URL);

        this.login=()=>{
            return new Promise((resolve, reject) => {
                socket.emit("login",
                            {"meetingId":MeetingId,"user":User},
                            (result)=>{
                                if (result.error===0){
                                    resolve(result.userList);
                                } else {
                                    reject(result);
                                }
                            });
            })
        }
    }
}
export default MeetingUtil;
