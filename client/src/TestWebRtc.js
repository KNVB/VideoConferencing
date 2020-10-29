import $ from "jquery/dist/jquery.js";
import LocalStreamManager from './utils/LocalStreamManager';
import React from "react";
import WebRTC from './utils/WebRTC';
class TestWebRtc extends React.Component {
    constructor(props) {
        super(props);
        this.userId=this.props.match.params.userId;
        this.localStream=null;
        this.localStreamManager=new LocalStreamManager();
        this.localVideo=React.createRef();
        this.logger=React.createRef();
        this.remoteVideo=React.createRef();
        this.webRTC=null;
  
        this.call=async()=>{
            this.webRTC.call();
        }
        this.handleDataChannelOpen=()=>{
            console.log("Data channel opened.");
            
        }
        this.handleRemoteTrack=(event)=>{
            console.log(event.track);
            console.log("Track event received");
            if (this.remoteVideo.current.srcObject===null)
                this.remoteVideo.current.srcObject=new MediaStream();
            this.remoteVideo.current.srcObject.addTrack(event.track);
            //this.remoteVideo.current.play();
        }
        this.hangUp=()=>{
            this.webRTC.hangUp();
            this.webRTC=null;
            this.localStreamManager.closeStream(this.remoteVideo.current.srcObject);
            this.initWebRtc();
        }
        this.initWebRtc=()=>{
            this.webRTC=new WebRTC();
            this.webRTC.setMsgLogger(this.msgLogger);
            this.webRTC.setDataChannelOpenEventHandlder(this.handleDataChannelOpen)
            this.webRTC.setTrackEventHandler(this.handleRemoteTrack);
            this.webRTC.setLocalStream(this.localVideo.current);
            this.webRTC.init();
        }
        this.msgLogger=(msg)=>{
            console.log(msg);
        }
        this.updateSrc=async()=>{
            var shareAudio=($(document.getElementById("shareAudio")).val()==='yes')?true:false;
            var shareVideo=($(document.getElementById("shareVideo")).val()==='yes')?true:false;

            await this.localStreamManager.getMediaStream(shareVideo,shareAudio)
            .then(stream=>{
                this.localStream=stream; 
                this.localVideo.current.srcObject=stream;
                this.webRTC.updateLocalStream();
            })
            .catch(error=>{
                console.log(error);
                if (this.localVideo.current.srcObject)
                    this.localStreamManager.closeStream(this.localVideo.current.srcObject);
            })
        }
    }
    componentDidMount() {
        document.getElementById("root").classList.add("p-1");
        this.initWebRtc();
    }
    componentWillUnmount() {
        document.getElementById("root").classList.remove("p-1");
        this.localStreamManager.closeStream(this.localVideo.current.srcObject);
        this.localStreamManager.closeStream(this.remoteVideo.current.srcObject);
    }
   
    render(){
        return (
            <div className="border-top border-primary container-fluid d-flex flex-column">
                <div className="row">
                    <div className="border-left border-bottom border-primary col-6 h4 p-1 mb-0">
                        Self View
                    </div>
                    <div className="border-left border-bottom border-right border-primary col-6 h4 p-1 mb-0">
                        Remote View
                    </div>
                </div>
                <div className="row">
                    <div className="border-left border-bottom border-primary 
                                col-6 p-1"
                        style={{"height":"25vh"}}>
                        <video ref={this.localVideo} autoPlay controls muted />
                    </div>
                    <div className="border-left border-bottom border-primary 
                                border-right col-6 p-1"
                        style={{"height":"25vh"}}>
                        <video ref={this.remoteVideo} autoPlay controls muted/>
                    </div>
                </div>
                <div className="row">
                    <div className="align-items-center border-left border-bottom border-right border-primary col-12 d-flex flex-row justify-content-center p-0">
                        <div className="btn-group-toggle d-flex justify-content-center p-1">
                            <button className="btn-sm btn btn-lg btn-success" onClick={this.call}>Make A Call</button>
                        </div>
                        <div className="btn-group-toggle d-flex justify-content-center p-1">
                            <button className="btn-sm btn btn-lg btn-success" onClick={this.clearLog}>Clear Log</button>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="align-items-center border-left border-bottom border-right border-primary col-12 d-flex flex-row justify-content-center p-0">
                        <div className="btn-group-toggle p-1">
                            <label className="btn-sm btn btn-lg btn-success">
                                Share 
                                <select id="shareVideo" className="bg-success text-white" onChange={this.updateSrc}>
                                    <option value="no" >No</option>
                                    <option value="yes">Yes</option>
                                </select>
                                Video
                            </label>
                        </div>
                        <div className="btn-group-toggle p-1">
                            <label className="btn-sm btn btn-lg btn-success">
                                Share Audio
                                <select id="shareAudio" className="bg-success text-white" onChange={this.updateSrc}>
                                    <option value="no" >No</option>
                                    <option value="yes">Yes</option>
                                </select>
                            </label>
                        </div>				
                    </div>
                </div>
                <div className="row">
                    <div className="align-items-center border-left border-bottom border-right border-primary col-12 d-flex flex-row justify-content-center p-0">
                        <div className="btn-group-toggle d-flex justify-content-center p-1">
                            <button className="btn-sm btn btn-lg btn-success" onClick={this.hangUp}>Hangup</button>
                        </div>
                        <div className="btn-group-toggle d-flex justify-content-center p-1">
                            <button className="btn-sm btn btn-lg btn-success" onClick={this.copyLog}>Copy log to clipboard</button>
                        </div>
                        <div className="btn-group-toggle d-flex justify-content-center p-1">
                            <button className="btn btn-lg btn-sm btn-danger">
                                Connection status:&nbsp;<span id="status">closed</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="position-relative row" style={{"height":"20vh"}}>
                    <div className="border-bottom border-left border-primary border-right  
                                col-12 d-flex flex-column h-100 overflow-auto position-absolute p-0" 
                        ref={this.logger}>
                    </div>
                </div>                
            </div>
        )
    }
}
export default TestWebRtc