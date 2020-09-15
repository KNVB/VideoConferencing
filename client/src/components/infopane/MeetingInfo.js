import Card  from 'react-bootstrap/Card';
import copy from "copy-to-clipboard"; 
import React from "react";

class MeetingInfo extends React.Component {
    constructor(props){
        super(props);
        this.meetingInfo=React.createRef();
        this.meetingLink=window.location.protocol+"//"+window.location.host+"/joinMeeting/"+this.props.meetingInfo.meetingId;
        //console.log(this.props.meetingId);
    }
    copyLink(){
        copy(this.meetingLink);
        alert("The join meeting link have been copied to clipboard.");
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
                        Click 
                        <svg className="btnlink" 
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
                            viewBox="0 0 24 24" onClick={()=>this.copyLink()}>
                            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
                        </svg>
                        to get the join meeting link<br/>{/*this.meetingLink*/}

                        User Alias:{this.props.meetingInfo.user.alias}
                    </div>
                </Card.Body>
            </Card>            
        )
    }
}
export default MeetingInfo