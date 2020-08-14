import Card  from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';
import Media from './Media';
import MaxMinButton from './buttons/MaxMinButton';
import MuteButton from './buttons/MuteButton';
import PInPButton from "./buttons/PInPButton";
import React from 'react';
import './MediaPlayer.css'
class NormalPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.media=React.createRef();
        this.state={};
        this.state["showControlBar"]=true;
        this.state["timeUpdateHandler"]="00:00:00";
        this.state["toggleMute"]=this.toggleMute;
        this.state["togglePInP"]=this.togglePInP;
    }
    hideControlBar=()=>{
        this.setState({showControlBar:false});
    };
   
    showControlBar=()=>{
        this.setState({showControlBar:true});
    };
    timeUpdateHandler=(timeValue)=>{
        this.setState({elapseTime:timeValue});
    }
    toggleControlBar=(event)=>{
        if (event.target.classList.contains('playerOverlay'))
            this.setState({showControlBar: !this.state.showControlBar});
    }
    
    toggleMirror=()=>{
        this.media.toggleMirror();
    } 
    render() {
        var pInPClass,playerClass;
        if (this.props.showFullScreen){
            playerClass="full_screen rounded p-1";
        } else {
            playerClass="h-100 rounded p-1";
        }
        if(this.media.current===undefined){
            if (this.props.showMiniPlayer){
                this.media.pause();
                pInPClass="showMiniPlayer";
            } else{
                this.media.play();
                pInPClass="hideMiniPlayer";
            }
        }
        return (
            <Card className={playerClass}>
                <Media mediaClass="card-body p-0 rounded w-100" 
                    muted={this.props.muted}
                    src="https://www.w3schools.com/html/movie.mp4"
                    timeUpdateHandler={this.timeUpdateHandler}
                    ref={instance => { this.media = instance; }}/>
                <div 
                    className="align-items-center 
                        justify-content-center 
                        playerOverlay
                        text-white">        
                </div>
                <div className="p-1
                        justify-content-end 
                        playerOverlay
                        rounded"
                        onClick={this.toggleControlBar}>
                            <Collapse in={this.state.showControlBar} 
                                className="bg-secondary p-1 rounded text-white w-100">
                                <div className="p-0 m-0">
                                    <div className="align-items-center d-flex flex-row justify-content-between p-0">
                                        <MuteButton toggleMute={this.props.toggleMute}  muted={this.props.muted}/>
                                        <div><span>{this.state.elapseTime}</span></div>
                                    </div>
                                    <div className="align-items-center d-flex flex-row justify-content-between p-0">
                                        <PInPButton 
                                            showFullScreen={this.props.showFullScreen}
                                            togglePInP={this.props.togglePInP}/>
                                        <div onClick={this.toggleMirror}>
                                            &#x21c4;
                                        </div>
                                        <MaxMinButton 
                                            toggFullScreen={this.props.toggFullScreen} 
                                            showFullScreen={this.props.showFullScreen}/>
                                    </div>
                                </div>
                            </Collapse>
                </div>
                <div className={pInPClass}>
                </div>    
            </Card>
        )
    }
}
export default NormalPlayer;