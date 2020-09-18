import config from './config';
import fetchApi from './fetch';
import io from 'socket.io-client';
class MeetingUtil {
    constructor(meetingInfo){
        var SOCKET_IO_URL='http://' + config.API_HOST + ':' + String(config.API_PORT)+"/";
        var SOCKET_URL=config.SOCKET_URL|| SOCKET_IO_URL;
        this.meetingId=meetingInfo.meetingId;
        this.memberList={};
        this.socket=io.connect(SOCKET_URL);
        this.user=meetingInfo.user;
        
        this.login=(callBack)=>{
            this.socket.emit("login",
            {meetingId:this.meetingId,user:this.user},
            (result)=>{
                if (result.error===0){
                    this.memberList=result.memberList;
                }
                callBack(result);
            });
        }
        /*
        this.getMemberList=async()=>{
            return await fetchApi('/getMemberList','POST',{},{meetingId:this.meetingId,user:this.user},'json')
            .then(ml=>{
                    this.memberList=ml;
                });
        }
        */
        this.leaveMeeting=()=>{
            this.socket.emit("leaveMeeting",{"meetingId":this.meetingId,"userId":this.user.id});
            this.socket.disconnect();
        }             
    }
}
export default MeetingUtil;