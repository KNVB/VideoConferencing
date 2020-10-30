import "./components/media/Media.css";
import config from './utils/config';
import LocalStreamManager from './utils/LocalStreamManager';
import Peer from "peerjs";
import React, { Fragment } from "react";
class TestPeer extends React.Component {
    constructor(props) {
        super(props);
        this.localStream=null;
        this.localStreamManager=new LocalStreamManager(); 
        this.remoteTag=React.createRef();
        this.videoTag=React.createRef();
        this.userId=this.props.match.params.userId;
        this.handleCall=(call)=>{
            console.log("The call is "+((call.open)?"":"not")+" open.");
            call.on("error",(err)=>{
                console.log(err);
            });
            call.on("stream",(remoteStream=>{
                console.log("stream event from "+call.metadata.alias+" received");
                this.remoteTag.current.srcObject=remoteStream;
            }));
        }
        this.sendStream=()=>{
            var call=this.peer.call("1",this.localStream,{metadata:{"userId":2,"alias":"二仔"}});
            this.handleCall(call);
        }
    }
    componentDidMount() {
        this.peer=new Peer(this.userId,{
            config:{
                iceServers:[
                            {urls: "stun:stun.stunprotocol.org"},
                            {urls: "stun:stun.l.google.com:19302"},
                            {
                                urls: "turn:numb.viagenie.ca", 
                                credential: "turnserver", username: "sj0016092@gmail.com"
                            }		
                        ]
            },
            debug:2,
            host:config.PEER_SERVER,
            path:"/peerServer",
            port:config.SOCKET_PORT,
            proxied: true
        });
        this.peer.on('call', call=>{
            console.log("Receive call from "+call.metadata.alias);
            call.answer(this.localStream);
            this.handleCall(call);
        });
        var shareVideo,shareAudio;
        if (parseInt(this.userId)%2===0){
            shareVideo=false;
            shareAudio=true;
        } else {
            shareVideo=true;
            shareAudio=false;
        }
        this.localStreamManager.getMediaStream(shareVideo,shareAudio)
        .then (stream=>{
            this.videoTag.current.srcObject=stream;    
            this.localStream=stream;
            //console.log(stream);
        })
        .catch(error=>{
            throw error
        })
    }
   

    render(){
        var finalClass = "bg-dark h-25 m-1 rounded w-25";
        var sendButton=null;
        if (parseInt(this.userId)%2===0){
            sendButton=<button className="m-1" onClick={this.sendStream}>Send Stream</button>
        }

        return(
            <Fragment>
                <video
                    autoPlay
                    className={finalClass}
                    controls
                    muted={true}            
                    ref={this.videoTag}/>
                    <br/>
                    {sendButton}<br/>
                    <video
                        autoPlay
                        className={finalClass}
                        controls
                        muted={true}            
                        ref={this.remoteTag}/>
            </Fragment>
        )
    }
}
export default TestPeer;