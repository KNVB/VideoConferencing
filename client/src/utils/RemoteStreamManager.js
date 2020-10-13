import config from '../../../utils/config';
import Peer from "peerjs";
class RemoteStreamManager {
    constructor(thisUserId){
        this.peer=new Peer(thisUserId,{host:"/",path:"/peerServer",port:config.API_PORT,debug:2});
    }
}
export default RemoteStreamManager