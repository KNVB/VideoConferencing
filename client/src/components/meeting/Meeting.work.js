import MediaPlayer from '../mediaplayer/MediaPlayer';
import MeetingUtil from "../../utils/MeetingUtil";
import "./Meeting.css";
import React from "react";
import { Redirect } from "react-router-dom";
import ActionPane from '../actionpane/ActionPane';
class Meeting extends React.Component {
  constructor(props){
    super(props);
    this.state={};
  }
  async componentDidMount() {
    document.getElementById("root").classList.add("p-1");
    var meetingUtil;
    try{
      meetingUtil =new MeetingUtil(this.meetingInfo);
      await meetingUtil.getMemberList();
      this.setState({"meetingUtil":meetingUtil});
    } catch (error){
      console.log(error);
    }
  }
  componentWillUnmount() {
    document.getElementById("root").classList.remove("p-1");
  }
  render() {
    if (sessionStorage.getItem("meetingInfo")===null){
      alert("The access for this meeting is invalid, please login first.");
      return <Redirect to="/"/>
    } else {  
      this.meetingInfo=JSON.parse(sessionStorage.getItem("meetingInfo"));
      //console.log(this.state.meetingUtil);
      return (
          <div className="border border-info meeting p-0 rounded">
            <MediaPlayer meetingUtil={this.state.meetingUtil}/>
            <div className="panel d-flex flex-grow-1">
              <ActionPane meetingUtil={this.state.meetingUtil}/>
            </div>
          </div>
        );
      }    
  }
}
export default Meeting;