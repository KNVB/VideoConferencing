import Collapse from "react-bootstrap/Collapse";
import MaxMinButton from "./buttons/MaxMinButton";
import Media from "../media/Media";
import MuteButton from "./buttons/MuteButton";
import PInPButton from "./buttons/PInPButton";
import React, { Fragment } from "react";
import ShareAudioButton from './buttons/ShareAudioButton';
import ShareVideoButton from './buttons/ShareVideoButton';

import "./MediaPlayer.css";
import "./buttons/Button.css";
class MediaPlayer extends React.Component {
    constructor(props) {
        super(props);
        var user=this.props.meetingControl.user;
        
        this.media = React.createRef();
        this.state = {};
        this.state["muted"] = true;
        if (user.shareMedia.audio==="true"){
          this.state["shareAudio"]=true;
        } else {
          this.state["shareAudio"]=false;
        }
        if (user.shareMedia.video==="true"){
          this.state["shareVideo"]=true;
        }else{
          this.state["shareVideo"]=false;
        }
        this.state["showControlBar"] = true;    
        this.state["showFullScreen"] = false;
        this.state["stream"]=null;
        this.state["timeUpdateHandler"] = "00:00:00";
    }
    async componentDidMount() {
        this.props.meetingControl.remoteStreamHandler["MediaPlayer.remoteStreamHandler"]=this.remoteStreamHandler;
        await this.setStream(this.state.shareVideo,this.state.shareAudio)
        .then (()=>{
          console.log("Init local stream success");
        })
        .catch (error=>{
          console.log("An Exception is catched by MediPlayer");
          console.log(error.message);
        })
        console.log("Init Media Player success");
    }
    remoteStreamHandler=(metadata,stream)=>{
        console.log("Receive stream from "+metadata.alias);
        var user=this.props.meetingControl.userList[metadata.userId];
        if(user.isHost){
            this.media.current.setStream(stream);
        }
    }

    timeUpdateHandler = (timeValue) => {
        this.setState({ elapseTime: timeValue });
    };
    toggleControlBar = (event) => {
        if (event.target.classList.contains("controlLayer"))
            this.setState({ showControlBar: !this.state.showControlBar });
    };
    toggFullScreen = () => {
        this.setState({
            showFullScreen: !this.state.showFullScreen,
        });
    };
    toggleMirror = () => {
        this.media.current.toggleMirror();
        };
    toggleMute = () => {
        this.setState({
            muted: !this.state.muted,
        });
    };
    toggleShareAudio=async()=>{
        var audioState=!this.state.shareAudio;    
        await this.setStream(this.state.shareVideo,audioState)
        .then(()=>{
            this.setState({"shareAudio":audioState,
                            "shareVideo":this.state.shareVideo});
        })
        .catch(error=>{
            console.log(error.message);
        })
    }
    toggleShareVideo=async()=>{
        var videoState=!this.state.shareVideo;
        await this.setStream(videoState,this.state.shareAudio)
        .then(()=>{
            this.setState({"shareAudio":this.state.shareAudio,
                            "shareVideo":videoState});
        })
        .catch(error=>{
            console.log(error.message);
        })
    }
    setStream=async (shareVideo,shareAudio)=>{
        var stream=null;
        await this.props.meetingControl.getLocalStream(shareVideo,shareAudio)
        .then(()=>{
            stream=this.props.meetingControl.localStream;
            console.log("The local stream is "+((stream)?"Object":"null"));
        })
        .catch (error=>{
            throw error;
        }) 
        .finally(()=>{     
            //this.media.current.setStream(stream);
            this.setState({"stream":stream});
        })
    };
    showPInP = () => {
        /*
        this.setState({ showControlBar: false });
        this.setState(
          {
            showPInPPlayer: !this.state.showPInPPlayer,
          },
          () => {
            this.media.current.pause();
          }
        );
        */
    };
    render() {
        var playerClass = "d-flex flex-grow-1 p-1 rouned";
        if (this.state.showFullScreen === true) {
            playerClass += " full_screen";
        } else {
            playerClass += " border border-warning ";
            playerClass += " panel position-relative";
        }
        return (
            <Fragment>
                <div className={playerClass}>
                    <Media
                    meetingControl={this.props.meetingControl}
                    muted={this.state.muted}
                    ref={this.media}
                    timeUpdateHandler={this.timeUpdateHandler}
                    />
                <div className="controlLayer m-1 p-1" onClick={this.toggleControlBar}>
                    <Collapse
                    className="border-top border-white p-1 text-white w-100"
                    in={this.state.showControlBar}>
                        <span className="p-0 m-0">
                            <div className="d-flex flex-grow-1 flex-row justify-content-between">
                                <div>
                                    <MuteButton
                                    toggleMute={this.toggleMute}
                                    muted={this.state.muted}
                                    />
                                    <PInPButton
                                    showFullScreen={this.state.showFullScreen}
                                    togglePInP={this.showPInP}
                                    />
                                </div>
                                <div className="d-flex flex-row flex-grow-1 justify-content-around m-0 p-0">
                                    <ShareAudioButton shareAudioState={this.state.shareAudio}
                                        toggleShareAudio={this.toggleShareAudio}/>
                                    <ShareVideoButton shareVideoState={this.state.shareVideo}
                                        toggleShareVideo={this.toggleShareVideo}/>
                                </div>
                                <div>
                                    <div className="btnlink" title="Mirror the video" onClick={this.toggleMirror}>
                                    &#x21c4;
                                    </div>
                                    <MaxMinButton
                                        toggFullScreen={this.toggFullScreen}
                                        showFullScreen={this.state.showFullScreen}
                                    />
                                </div>
                            </div>
                        </span>
                    </Collapse>
                </div>    
            </div>
            </Fragment>                  
        )
    }
}
export default MediaPlayer;