import React, { Fragment } from 'react';
import Utility from "../../Utility";
import './MediaPlayer.css'
class Media extends React.Component {
    constructor(props) {
        super(props);
        this.state={mirror:false};
        this.videoTag=React.createRef();
    }
    componentDidMount(){
        if (this.props["elapseTime"]){
            this.videoTag.currentTime=this.props["elapseTime"];
        }
        this.videoTag.ontimeupdate=(()=>{
            if (this.videoTag && this.props.timeUpdateHandler){
                this.props.timeUpdateHandler(Utility.toHHMMSS(this.videoTag.currentTime));
            }
        });
    }
    pause=()=>{
        this.videoTag.pause();
    }
    play=()=>{
        this.videoTag.play();
    }
    setStream(stream){
        this.videoTag.srcObject=null;
	    this.videoTag.srcObject=stream;
    }
    toggleMirror(){
        this.setState({
            mirror: !this.state.mirror
        });
    }
    render() {
        var finalClass=this.props.mediaClass;
        var mediaSource=null;
        if (this.state.mirror){
            finalClass+=" mirror";
        } else {
            finalClass=finalClass.replace(" mirror","");
        }
        if (this.props.mediaSource!=null){
            mediaSource=<source src={this.props.mediaSource}/>
        }
        return (
            <Fragment>
                <video  
                    autoPlay
                    className={finalClass}
                    muted={this.props.muted}                    
                    ref={instance => { this.videoTag = instance; }}>
                        {mediaSource}
                </video>
                <div 
                    className="align-items-center 
                            justify-content-center 
                            playerOverlay
                            text-white">        
                </div>
            </Fragment>    
        );
    }
}
export default Media;        