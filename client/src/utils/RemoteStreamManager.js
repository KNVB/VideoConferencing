import config from './config';
import Peer from "peerjs";
class RemoteStreamManager {
    constructor(){
        var peer;
        this.connect=(thisUserId)=>{ 
            peer=new Peer(thisUserId,{host:"/",path:"/peerServer",port:config.API_PORT,debug:2});
        }
        this.disconnect=()=>{
            peer.disconnect();
        }
    }
}
export default RemoteStreamManager