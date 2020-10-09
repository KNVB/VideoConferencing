import { Button,Modal } from 'react-bootstrap';
import React,{Component, Fragment}  from 'react';
import { Redirect } from "react-router-dom";
class LeaveButton extends Component {
    constructor(props){
        super(props);
        this.state={"leave":false,showModal:false};
    }
    endMeeting=()=>{
        this.props.meetingUtil.endMeeting();
        this.setState({leave:true}); 
    }    
    leaveMeeting=()=>{
        /*var thisUser=this.props.meetingUtil.user;
        if (thisUser.isHost) {
            this.setState({showModal:true});
        } else {
            this.leaveMeetingOnly();
        }*/
        this.leaveMeetingOnly();
    }
    leaveMeetingOnly=()=>{
        this.props.meetingUtil.leaveMeeting();
        this.setState({leave:true});
    }
    render() {
        if (this.state.leave){
            return <Redirect to="/"/>
          } else {
            return (
                <Fragment>
                    <div className="align-items-center 
                                    btn d-flex                                                
                                    flex-column just-content-center 
                                    p-0"
                            onClick={()=>this.leaveMeeting()}>
                        <div className="p-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="sd-block m-auto" width="24" height="24" viewBox="0 0 24 24">
                                <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
                            </svg>
                        </div>                
                        <div className="p-0">Leave</div>
                    </div>
                    <Modal show={this.state.showModal}
                        backdrop="static"
                        keyboard={false}>
                        <Modal.Body className="align-items-center d-flex flex-row justify-content-around">
                            <Button variant="primary" onClick={this.leaveMeetingOnly}>
                                Leave the meeting only
                            </Button>                            
                            <Button variant="danger" onClick={this.endMeeting}>
                                End the meeting
                            </Button>
                        </Modal.Body>
                    </Modal>
                </Fragment>    
            );
        }
    }
}
export default LeaveButton;