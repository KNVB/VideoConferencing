import { Redirect } from "react-router-dom";
import { Spinner } from 'react-bootstrap';
import ActionPane from "../actionpane/ActionPane";
import "./Meeting.css";
import MediaPlayer from '../mediaplayer/MediaPlayer';
import MeetingControl from "../../utils/MeetingControl";
import React from "react";
class Meeting extends React.Component {
    constructor(props){
        super(props);
        this.state={leave:false}
    }
    componentDidMount(){
        if (sessionStorage.getItem("meetingInfo")===null){
            this.setState({"invalidAccess":true});
        } else {
            this.meetingInfo=JSON.parse(sessionStorage.getItem("meetingInfo"));
            var meetingControl =new MeetingControl(this.meetingInfo);
            meetingControl.login(result=>{
                if (result.error===0){
                    console.log("Meeting:"+JSON.stringify(meetingControl.userList));
                    meetingControl.meetingCloseHandler["Meeting.meetingCloseHandler"]=this.meetingCloseHandler;
                    meetingControl.leaveMeetingHandler["Meeting.leaveMeetingHandler"]=this.leaveMeetingHandler;
                    this.setState({"meetingControl":meetingControl});
                } else {
                    alert(result.message);
                }
            })
        }                
    }
    leaveMeetingHandler=()=>{
        sessionStorage.clear();
        this.setState({leave:true});
    }
    meetingCloseHandler=()=>{
        sessionStorage.clear();
        this.setState({closeMeeting:true});        
    }
    render() {
        if (this.state.invalidAccess){
            alert("The access for this meeting is invalid, please login first.");
            return <Redirect to="/"/>
        }if (this.state.meetingControl===undefined){
            return(
                <div className="align-items-center d-flex h-100 justify-content-center w-100">
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
            )
        }else {
            if (this.state.closeMeeting){
                alert("The host closes the meeting,all user must be loggout.");
                return <Redirect to="/"/>
            }else {
                if (this.state.leave){
                    return <Redirect to="/"/>
                }else {
                    return (
                        <div className="border border-info flex-grow-1 meeting p-0 rounded">
                            <MediaPlayer meetingControl={this.state.meetingControl}/>
                            <div className="panel d-flex flex-grow-1">
                                <ActionPane meetingControl={this.state.meetingControl}/>
                            </div>
                        </div>
                    );
                }
            }
        }
    }
}
export default Meeting;