import InfoPane from "../infopane/InfoPane";
import MediaPlayer from '../mediaplayer/MediaPlayer';
import MeetingAPI from '../../utils//MeetingAPI';
import React from "react";
import "./Meeting.css";
import { Redirect } from "react-router-dom";
class Meeting extends React.Component {
  constructor(props){
    super(props)
    this.props=props;    
  }
  componentDidMount() {
    document.getElementById("root").classList.add("p-1");
    var meetingInfo=JSON.parse(sessionStorage.getItem("meetingInfo"));
    this.meetingAPI=new MeetingAPI();
    this.meetingAPI.connect();
    this.meetingAPI.connectMeeting(meetingInfo.meetingId,meetingInfo.user.id);
  }
  componentWillUnmount() {
    document.getElementById("root").classList.remove("p-1");
  }
  leaveMeeting=(event)=>{
    sessionStorage.clear();
    event.preventDefault(); 
    this.props.history.push("/");
  }
  render() {
    if (sessionStorage.getItem("meetingInfo")===null){
      alert("The access for this meeting is invalid, please login first.");
      return <Redirect to="/"/>
    } else {  
      return (
        <div className="border border-info meeting p-0 rounded">
          <MediaPlayer/>
          <div className="panel d-flex flex-grow-1">
            <InfoPane leaveMeeting={this.leaveMeeting}/>
          </div>
        </div>);
      }
    }  
}
export default Meeting;