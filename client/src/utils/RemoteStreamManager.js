import config from './config';
import Peer from "peerjs";
class RemoteStreamManager {
    constructor(){
        let peer=null;
        let thisUser=null;
        this.localStream=null;
        this.remoteStreamHandler=null;
        this.connect=(user)=>{ 
            thisUser=user;

            peer=new Peer(thisUser.id,{
                                        config:{
                                            'iceServers':[
                                                {urls: "stun:stun.stunprotocol.org"},
                                                {urls: "stun:stun.l.google.com:19302"},
                                                {urls: 'turn:numb.viagenie.ca', credential: 'muazkh',username: 'webrtc@live.com'},
                                                {urls: "turn:numb.viagenie.ca", credential: "turnserver", username: "sj0016092@gmail.com"}
                                            ]
                                        },                                        
                                        debug:2,
                                        host:config.PEER_SERVER,
                                        path:"/peerServer",
                                        port:config.SOCKET_PORT});
            peer.on("call",call=>{
                call.answer(this.localStream); //Before getting the remote stream, answer the call with the stream;
                call.on("stream",(remoteStream=>{
                    if (this.remoteStreamHandler)
                        this.remoteStreamHandler(call.metadata,remoteStream);
                }));
            });
        }
        this.sendStreamToAllUser=(userList,stream)=>{
            
            Object.keys(userList).forEach(userId=>{
                if (thisUser.id !==userId){
                    //console.log("The localStream has "+stream.getTracks().length+" tracks");
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
            if (peer)
                peer.disconnect();
        }
    }
}
export default RemoteStreamManager