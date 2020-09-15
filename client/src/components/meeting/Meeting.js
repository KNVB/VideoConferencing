import {Button,Modal}  from 'react-bootstrap';
import InfoPane from "../infopane/InfoPane";
import MediaPlayer from '../mediaplayer/MediaPlayer';
import MeetingAPI from '../../utils//MeetingAPI';
import React, { Fragment } from "react";
import "./Meeting.css";
import { Redirect } from "react-router-dom";
class Meeting extends React.Component {
  constructor(props){
    super(props)
    this.state={"memberList":{},
                 approvalUser:{},
                 showApprovModal : false};
  }
  componentDidMount() {
    document.getElementById("root").classList.add("p-1");
    this.meetingAPI=new MeetingAPI();
    this.meetingAPI.cancelApprovalReqHandler=this.cancelApprovalReqHandler;
    this.meetingAPI.approvalRequestHandler=this.approvalRequestHandler;
    this.meetingAPI.memberJoinHandler=this.memberJoinHandler;
    this.meetingAPI.memberLeftHandler=this.memberLeftHandler;
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
  approveRequest=()=>{
    this.meetingAPI.approveRequest(this.meetingInfo.meetingId,this.state.approvalUser.id);
    var memberList=this.state.memberList;
    delete memberList[this.state.approvalUser.id];
    this.setState({approvalUser:{},
                   "memberList":memberList,
                   showApprovModal : false});
  }
  approvalRequestHandler=(user)=>{
    console.log(user.alias+" Request Approval");
    var memberList=this.state.memberList;
    memberList[user.id]=user;
    this.setState({"memberList":memberList});
  }
  cancelApprovalReqHandler=(user)=>{
    var memberList=this.state.memberList;
    delete memberList[user.id];
    this.setState({approvalUser:{},
                   "memberList":memberList,
                   showApprovModal : false});        
  };
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
  pendingRequestHandler=(user)=>{
    this.setState({approvalUser:user,
    showApprovModal : true});
  }
  rejectRequest=()=>{
    this.meetingAPI.rejectRequest(this.meetingInfo.meetingId,this.state.approvalUser.id);
    var memberList=this.state.memberList;
    delete memberList[this.state.approvalUser.id];
    this.setState({approvalUser:{},
                   "memberList":memberList,
                   showApprovModal : false});
  }
  render() {
    if (sessionStorage.getItem("meetingInfo")===null){
      alert("The access for this meeting is invalid, please login first.");
      return <Redirect to="/"/>
    } else {  
      this.meetingInfo=JSON.parse(sessionStorage.getItem("meetingInfo"));
      return (
        <Fragment>
          <div className="border border-info meeting p-0 rounded">
            <MediaPlayer/>
            <div className="panel d-flex flex-grow-1">
              <InfoPane leaveMeeting={this.leaveMeeting} 
                        memberList={this.state.memberList}
                        pendingRequestHandler={this.pendingRequestHandler}
                        meetingInfo={this.meetingInfo}/>
            </div>
          </div>
          <Modal show={this.state.showApprovModal}
                  backdrop="static"
                  keyboard={false}>
            <Modal.Body className="align-items-center d-flex flex-column justify-content-center">
              User {this.state.approvalUser.alias} request to join the meeting?
            </Modal.Body>
            <Modal.Footer ref={this.modalFooter}>
              <Button variant="primary" onClick={this.approveRequest}>Approve</Button>
              <Button variant="secondary" onClick={this.rejectRequest}>
                Reject
              </Button>
            </Modal.Footer>
          </Modal>
        </Fragment>);
      }
    }  
}
export default Meeting;