//import NormalPlayer from './NormalPlayer';
import Card  from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';
import Media from './Media';
import MaxMinButton from './buttons/MaxMinButton';
import MuteButton from './buttons/MuteButton';
import PInPButton from "./buttons/PInPButton";

import React, { Fragment } from 'react';
import MiniPlayer from './MiniPlayer';
class MediaPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.media=React.createRef();
        this.state={};
        this.state["showControlBar"]=true;
        this.state["timeUpdateHandler"]="00:00:00";
        this.state["showFullScreen"]=false;
        this.state["showMiniPlayer"]=false;
        this.playerClass="h-100 rounded p-1";
        this.state.muted=true;
    }
    hideMiniPlayer=()=>{
        this.setState({
            showMiniPlayer:false
        });
    }
    timeUpdateHandler=(timeValue)=>{
        this.setState({elapseTime:timeValue});
    }
    toggleControlBar=(event)=>{
        if (event.target.classList.contains('playerOverlay'))
            this.setState({showControlBar: !this.state.showControlBar});
    }
    toggFullScreen=()=>{
        this.setState({
                    showFullScreen:!this.state.showFullScreen
                })
    }
    toggleMirror=()=>{
        this.media.toggleMirror();
    } 
    toggleMute = () => {
        this.setState({
          muted: !this.state.muted
        });
    };
 
    togglePInP=()=>{
        this.setState({
            showMiniPlayer:!this.state.showMiniPlayer
        });
    }
    render(){
        var miniPlayer=null,pInPClass, playerClass;
        if (this.state.showFullScreen){
            playerClass="full_screen rounded p-1";
        } else {
            playerClass="h-100 rounded p-1";
        }
        if (this.state.showMiniPlayer){
            miniPlayer=<MiniPlayer hideMiniPlayer={this.hideMiniPlayer} muted={this.state.muted}/>
        }
        if(this.media.current===undefined){
            if (this.state.showMiniPlayer){
                this.media.pause();
                pInPClass="showMiniPlayer";
            } else{
                this.media.play();
                pInPClass="hideMiniPlayer";
            }
        }  
        return (
            <Fragment>
               <Card className={playerClass}>
                    <Media mediaClass="card-body p-0 rounded w-100" 
                        muted={this.state.muted}
                        mediaSource="https://www.w3schools.com/html/movie.mp4"
                        timeUpdateHandler={this.timeUpdateHandler}
                        ref={instance => { this.media = instance; }}/>
                    <div className="p-1
                        justify-content-end 
                        playerOverlay
                        rounded"
                        onClick={this.toggleControlBar}>
                            <Collapse in={this.state.showControlBar} 
                                className="bg-secondary p-1 rounded text-white w-100">
                                   <span className="p-0 m-0">
                                        <div className="align-items-center d-flex flex-row justify-content-between p-0">
                                            <MuteButton toggleMute={this.toggleMute}  muted={this.state.muted}/>
                                            <div><span>{this.state.elapseTime}</span></div>
                                        </div>
                                        <div className="align-items-center d-flex flex-row justify-content-between p-0">
                                            <PInPButton 
                                                showFullScreen={this.state.showFullScreen}
                                                togglePInP={this.togglePInP}/>
                                            <div onClick={this.toggleMirror}>
                                                &#x21c4;
                                            </div>
                                            <MaxMinButton 
                                                toggFullScreen={this.toggFullScreen} 
                                                showFullScreen={this.state.showFullScreen}/>    
                                        </div>
                                   </span>                                   
                            </Collapse>
                    </div>
                    <div className={pInPClass}>
                    </div>     
               </Card>
               {miniPlayer}
            </Fragment>    
        )
    }
}
export default MediaPlayer;