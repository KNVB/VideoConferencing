import Card  from 'react-bootstrap/Card';
import React from "react";

class MeetingInfo extends React.Component {
    constructor(props){
        super(props);
        this.meetingInfo=React.createRef();
        this.meetingLink=window.location.protocol+"//"+window.location.host+"/joinMeeting/"+this.props.meetingId;
        console.log(this.props.meetingId);
    }
    hide(){
        this.meetingInfo.current.classList.add("d-none");
    }
    show(){
        this.meetingInfo.current.classList.remove("d-none");
    }
    render() {
        return (
            <Card className="border border-primary d-none w-100" ref={this.meetingInfo}>
                <Card.Body className="d-flex flex-grow-1 position-relative p-0 rounded">
                    <div className="position-absolute h-100 overflow-auto w-100">
                        Click here to get the join meeting link {this.meetingLink}
                    </div>
                </Card.Body>
            </Card>            
        )
    }
}
export default MeetingInfo