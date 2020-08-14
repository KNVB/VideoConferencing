import React from 'react';
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
        this.videoTag.src=this.props["src"];       
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
        if (this.state.mirror){
            finalClass+=" mirror";
        } else {
            finalClass=finalClass.replace(" mirror","");
        }
        return (
            <video  
                autoPlay
                muted={this.props.muted}
                className={finalClass}
                ref={instance => { this.videoTag = instance; }}>
            </video>
        );
    }
}
export default Media;        