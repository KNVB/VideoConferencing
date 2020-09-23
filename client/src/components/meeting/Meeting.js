import { Redirect } from "react-router-dom";
import { Spinner } from 'react-bootstrap';
import ActionPane from "../actionpane/ActionPane";
import "./Meeting.css";
import MediaPlayer from '../mediaplayer/MediaPlayer';
import MeetingUtil from "../../utils/MeetingUtil";
import React from "react";
class Meeting extends React.Component {
    constructor(props){
        super(props);
        this.state={leave:false};
    }    
    componentDidMount() {
        document.getElementById("root").classList.add("p-1");
        var meetingUtil =new MeetingUtil(this.meetingInfo);
        
        meetingUtil.login(result=>{
            //console.log(result);
            if (result.error===0){
                meetingUtil.meetingCloseHandler.push(this.meetingCloseHandler);
                this.setState({"meetingUtil":meetingUtil});
            } else {
                alert(result.message);
                sessionStorage.clear();
                this.setState({});
            }
        })
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
            if (this.state.meetingUtil===undefined){
                return(
                    <div className="align-items-center d-flex justify-content-center">
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
    }    
}
export default Meeting;