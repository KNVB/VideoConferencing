import React, { Fragment } from "react";
import "./Media.css";
import Utility from '../../utils/Utility';
class Media extends React.Component {
  constructor(props) {
    super(props);
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
  closeMedia=()=>{
    if (this.videoTag.current && this.videoTag.current.srcObject) {
      this.videoTag.current.srcObject.getTracks().forEach( async track=>{
        await track.stop();
      });
      this.videoTag.current.srcObject=null;
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
    console.log(stream);
    this.videoTag.current.srcObject = null;
    this.videoTag.current.srcObject = stream;
  }
  toggleMirror() {
    this.setState({
      mirror: !this.state.mirror,
    });
  }
  render() {
    var finalClass = "rounded w-100";
    if (this.state.mirror) {
      finalClass += " mirror";
    }
    return (
      <Fragment>
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
        <div className="bg-dark d-none mediaStatus text-white">dsfsdf</div>
      </Fragment>
    );
  }
}
export default Media;
