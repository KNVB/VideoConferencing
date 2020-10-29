import { Redirect } from "react-router-dom";
import { Spinner } from 'react-bootstrap';
import ActionPane from "../actionpane/ActionPane";
import "./Meeting.css";
import MediaPlayer from '../mediaplayer/MediaPlayer';
import MeetingControl from "../../utils/MeetingControl";
import React from "react";
import Utility from '../../utils/Utility';
class Meeting extends React.Component {
    constructor(props){
        super(props);
        this.state={leave:false}
    }
    componentDidMount(){
        //console.log(Utility.getMeetingInfo());
        document.getElementById("root").classList.add("p-1");
        this.meetingInfo=Utility.getMeetingInfo();
        if ( this.meetingInfo===null){
            this.setState({"invalidAccess":true});
        } else {
            console.log(this.meetingInfo);
            var meetingControl =new MeetingControl(this.meetingInfo);
            meetingControl.login(async result=>{
                if (result.error===0){
                    console.log("Meeting User List:"+JSON.stringify(meetingControl.userList));
                    console.log("meetingControl.user="+JSON.stringify(meetingControl.user));
                    console.log("this.meetingInfo="+JSON.stringify(this.meetingInfo.user));
                    await meetingControl.getLocalStream(meetingControl.user.shareMedia.video,meetingControl.user.shareMedia.audio)
                    .then(()=>{
                        console.log("The local stream is "+((meetingControl.localStream)?"Object":"null"));
                    })
                    .catch (error=>{
                        console.log("Get local stream failure."+error.message);
                    }) 
                    .finally(()=>{     
                        meetingControl.meetingCloseHandler["Meeting.meetingCloseHandler"]=this.meetingCloseHandler;
                        meetingControl.leaveMeetingHandler["Meeting.leaveMeetingHandler"]=this.leaveMeetingHandler;
                        this.setState({"meetingControl":meetingControl});
                    })
                } else {
                    alert(result.message);
                }
            })
        }
    }
    componentWillUnmount() {
        document.getElementById("root").classList.remove("p-1");
    }
    leaveMeetingHandler=()=>{
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
        }
        if (this.state.meetingControl===undefined){
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
                    //console.log("Video:"+((Utility.getMeetingInfo().user.shareMedia.video)?"yes":"no"));
                    //console.log("Audio:"+((Utility.getMeetingInfo().user.shareMedia.audio)?"Yes":"No"));
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