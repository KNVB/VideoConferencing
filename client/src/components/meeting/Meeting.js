import InfoPane from "../infopane/InfoPane";
import MediaPlayer from '../mediaplayer/MediaPlayer';
import React from "react";
import "./Meeting.css";
class Meeting extends React.Component {
  constructor(props){
    super(props);
    this.meetingId=this.props.match.params.meetingId;
    this.user=localStorage.getItem("user");
    console.log(this.meetingId);
    console.log(this.user);
  }
  componentDidMount() {
    document.getElementById("root").classList.add("p-1");
  }
  componentWillUnmount() {
    document.getElementById("root").classList.remove("p-1");
  }
  render() {
    return (
      <div className="border border-info meeting p-0 rounded">
        <MediaPlayer/>
        <div className="panel d-flex flex-grow-1">
          <InfoPane/>
        </div>
      </div>);
  }
}
export default Meeting;                      