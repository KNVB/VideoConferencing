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
        this.state={leave:false};
    }    
    componentDidMount() {
        document.getElementById("root").classList.add("p-1");
        var meetingControl =new MeetingControl(this.meetingInfo);
        
        try
        {
            meetingControl.login();
            meetingControl.addMeetingCloseHandler("Meeting.meetingCloseHandler",this.meetingCloseHandler);
            this.setState({"meetingControl":meetingControl});
        }
        catch(error){
            console.log(error);
        }
        /*
        meetingControl.login(async result=>{
            //console.log(result);
            if (result.error===0){
                meetingControl.addMeetingCloseHandler("Meeting.meetingCloseHandler",this.meetingCloseHandler);
                this.setState({"meetingControl":meetingControl});
            } else {
                alert(result.message);
                sessionStorage.clear();
                this.setState({});
            }
        })*/
    }
    componentWillUnmount() {
        document.getElementById("root").classList.remove("p-1");
    }
    meetingCloseHandler=()=>{
        this.setState({leave:true});
    }    
    render() {
        if (sessionStorage.getItem("meetingInfo")===null){
          alert("The access for this meeting is invalid, please login first.");
          return <Redirect to="/"/>
        } else {
            this.meetingInfo=JSON.parse(sessionStorage.getItem("meetingInfo"));
            if (this.state.meetingControl===undefined){
                return(
                    <div className="align-items-center d-flex h-100 justify-content-center w-100">
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    </div>
                )
            }else {
                if (this.state.leave){
                    alert("The host closes the meeting,all user must be loggout.");
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