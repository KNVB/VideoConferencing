import config from './config';
import Peer from "peerjs";
class RemoteStreamManager {
    constructor(meetingControl){
        var thisUser;
        this.peer=null;        
        this.localStream=null;
        this.meetingControl=meetingControl;
        this.remoteStreamHandler=null;
        this.connect=(user)=>{ 
            thisUser=user;

            this.peer=new Peer(thisUser.id,{host:config.PEER_SERVER,path:"/peerServer",port:config.SOCKET_PORT,debug:2});
            this.peer.on("call",call=>{
                console.log("Receive call from "+call.metadata.alias);
                console.log(this.meetingControl.localStream);
                console.log("The local stream is "+((this.meetingControl.localStream)?"Object":"null"));
                call.answer(this.meetingControl.localStream); //Before getting the remote stream, answer the call with the stream;
                this.handleCall(call);
            });
        }
        this.disconnect=()=>{
            this.peer.disconnect();
        }
        this.handleCall=(call)=>{
            call.on("error",(err)=>{
                console.log(err);
            });
            call.on("stream",(remoteStream=>{
                console.log("stream event from "+call.metadata.alias+" received");
                console.log("remoteStreamHandler is "+((this.remoteStreamHandler)?"set":"not set"));
                if (this.remoteStreamHandler)
                    this.remoteStreamHandler(call.metadata,remoteStream);
            }));
        }
        this.sendStreamToAllUser=(userList)=>{
            Object.keys(userList).forEach(userId=>{
                if (thisUser.id !==userId){
                    this.sendStreamToUser(userList[userId],this.meetingControl.localStream);
                }
            });
        }
        this.sendStreamToUser=(toUser)=>{
            console.log("Local User:"+thisUser.alias);
            console.log("Send Stream to Remote User:"+toUser.alias);
            var call=this.peer.call(toUser.id,this.meetingControl.localStream,{metadata:{"userId":thisUser.id,"alias":thisUser.alias}});
            this.handleCall(call);
        }
    }
}
export default RemoteStreamManager