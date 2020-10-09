import React from "react";
import "./Media.css";
import Utility from '../../utils/Utility';
class Media extends React.Component {
  constructor(props) {
    super(props);
    this.mediaStatus=React.createRef();
    this.state = {};
    this.state={mirror:false};
    this.videoTag=React.createRef();
  }
  componentDidMount() {
    if (this.props["elapseTime"]) {
      this.videoTag.current.currentTime = this.props["elapseTime"];
    }
    this.props.meetingUtil.leaveMeetingHandler.push(this.closeMedia);
    this.videoTag.current.ontimeupdate = () => {
      if (this.videoTag.current && this.props.timeUpdateHandler) {
        this.props.timeUpdateHandler(
          Utility.toHHMMSS(this.videoTag.current.currentTime)
        );
      }
    };
  }
  componentDidUpdate(prevProps) {
    //this.closeMedia();    
    //console.log(this.props.stream);
    //this.videoTag.current.srcObject = this.props.stream;
  }
  closeMedia=async()=>{
    if (this.videoTag.current && this.videoTag.current.srcObject) {
      this.videoTag.current.srcObject.getTracks().forEach( async track=>{
        await track.stop();
      });
      this.videoTag.current.srcObject=null;
      this.mediaStatus.current.classList.add("d-none");
      console.log("Media closed.");
    }
  }
  getElapseTime=()=>{
    return this.videoTag.current.currentTime;
  }
  isEnded = () => {
    return this.videoTag.current.ended;
  };
  pause = () => {
    this.videoTag.current.pause();
  };
  play = () => {
    this.videoTag.current.play();
  };
  setStream(stream) {
    console.log("Set Stream");
    
    console.log("The incoming stream is "+((stream)?"Object":"null"));
    if (stream) {      
      console.log("The incoming stream has "+((stream.getAudioTracks().length>0)?"":"no")+" audio tracks");
      console.log("The incoming stream has "+((stream.getVideoTracks().length>0)?"":"no")+" video tracks");
      
      this.videoTag.current.srcObject = stream;
      
      if ((stream.getVideoTracks().length===0) && (stream.getAudioTracks().length>0)){
        this.mediaStatus.current.classList.remove("d-none");
      } else {
        this.mediaStatus.current.classList.add("d-none");
      }
    } else {
      this.closeMedia();
      this.mediaStatus.current.classList.add("d-none");
    }
  }
  toggleMirror() {
    this.setState({
      mirror: !this.state.mirror,
    });
  }
  render() {
    var finalClass = "bg-dark rounded w-100";
    if (this.state.mirror) {
      finalClass += " mirror";
    }
    return (
      <div className="m-0 p-0 h-100 w-100 position-relative">
        <video
          autoPlay
          muted={this.props.muted}
          className={finalClass}
          ref={this.videoTag}>
          {/*
            <source
              src="https://www.w3schools.com/html/movie.mp4"
              type="video/mp4"
            />
          */}  
        </video>
        <div className="d-none mediaStatus text-white" ref={this.mediaStatus}>
          <svg xmlns="http://www.w3.org/2000/svg" width="70%" height="70%" viewBox="0 0 24 24" fill="white">
            <path d="M12 1c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7c0-4.97-4.03-9-9-9z"/>
          </svg>
        </div>
      </div>
    );
  }
}
export default Media;
