import config from './config';
import Peer from "peerjs";
class RemoteStreamManager {
    constructor(){
        var peer;
        var thisUser;
        this.localStream=null;
        this.remoteStreamHandler=null;
        this.connect=(user)=>{ 
            thisUser=user;

            peer=new Peer(thisUser.id,{host:config.PEER_SERVER,path:"/peerServer",port:config.SOCKET_PORT,debug:2});
            peer.on("call",call=>{
                call.answer(this.localStream); //Before getting the remote stream, answer the call with the stream;
                call.on("stream",(remoteStream=>{
                    if (this.remoteStreamHandler)
                        this.remoteStreamHandler(call.metadata,remoteStream);
                }));
            });
        }
        this.sendStreamToAllUser=(userList,user,stream)=>{
            Object.keys(userList).forEach(userId=>{
                if (thisUser.id !==userId){
                    this.sendStreamToUser(userList[userId],stream);
                }
            });
        }
        this.sendStreamToUser=(toUser,stream)=>{
            this.localStream=stream;
            console.log("Local User:"+thisUser.alias);
            console.log("Send Stream to Remote User:"+toUser.alias);
            peer.call(toUser.id,stream,{metadata:{"userId":thisUser.id,"alias":thisUser.alias}});
        }
        this.disconnect=()=>{
            peer.disconnect();
        }
    }
}
export default RemoteStreamManager