import InfoPane from "../infopane/InfoPane";
import MediaPlayer from '../mediaplayer/MediaPlayer';
import MeetingAPI from '../../utils//MeetingAPI';
import React from "react";
import "./Meeting.css";
import { Redirect } from "react-router-dom";
class Meeting extends React.Component {
  constructor(props){
    super(props)
    //this.props=props;
    this.state={"memberList":{}};
  }
  componentDidMount() {
    document.getElementById("root").classList.add("p-1");
   
    this.meetingAPI=new MeetingAPI();
    this.meetingAPI.setMemberJoinHandler(this.memberJoinHandler);
    this.meetingAPI.setMemberLeftHandler(this.memberLeftHandler);
    this.meetingAPI.connect();
    this.meetingAPI.getMemberList(this.meetingInfo)
    .then ((memberList)=>{
      this.setState({"memberList":memberList});
      this.meetingAPI.joinMeeting(this.meetingInfo.meetingId,this.meetingInfo.user.id);
    })
    .catch ((err)=>{
      alert(err.message);
      this.props.history.push("/");
    });
    
    
  }
  componentWillUnmount() {
    document.getElementById("root").classList.remove("p-1");
  }
  leaveMeeting=(event)=>{
    this.meetingAPI.leaveMeeting(this.meetingInfo.meetingId,this.meetingInfo.user.id);
    sessionStorage.clear();
    event.preventDefault(); 
    this.props.history.push("/");
  }
  memberJoinHandler=(user)=>{
    var memberList=this.state.memberList;
    memberList[user.id]=user;
    this.setState({"memberList":memberList});
    console.log("member "+user.alias+" join the meeting");
  }
  memberLeftHandler=(user)=>{
    var memberList=this.state.memberList;
    delete memberList[user.id];
    this.setState({"memberList":memberList});
    console.log("member "+user.alias+" left the meeting");   
  }
  render() {
    if (sessionStorage.getItem("meetingInfo")===null){
      alert("The access for this meeting is invalid, please login first.");
      return <Redirect to="/"/>
    } else {  
      this.meetingInfo=JSON.parse(sessionStorage.getItem("meetingInfo"));
      return (
        <div className="border border-info meeting p-0 rounded">
          <MediaPlayer/>
          <div className="panel d-flex flex-grow-1">
            <InfoPane leaveMeeting={this.leaveMeeting} 
                      memberList={this.state.memberList}
                      meetingInfo={this.meetingInfo}/>
          </div>
        </div>);
      }
    }  
}
export default Meeting;