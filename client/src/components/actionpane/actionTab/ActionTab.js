import {Tab} from "react-bootstrap";
import React from "react";
import MeetingInfo from "./MeetingInfo";
import UserList from "./UserList";
import ChatBox from "./chatBox/ChatBox";
class ActionTab extends React.Component {
  render() {
    return (
      <Tab.Content className="d-flex flex-grow-1">
        <Tab.Pane
          className="border border-primary container-fluid p-1 rounded"
          eventKey="meetingInfo">
            <MeetingInfo meetingControl={this.props.meetingControl}/>    
        </Tab.Pane>
        <Tab.Pane
          className="border border-primary container-fluid fade p-0 position-relative rounded"
          eventKey="userList">
            <UserList meetingControl={this.props.meetingControl}/>  
        </Tab.Pane>
        <Tab.Pane
          className="border border-primary container-fluid fade p-0 position-relative rounded"
          eventKey="chatBox">
            <ChatBox meetingControl={this.props.meetingControl}/>
        </Tab.Pane>
      </Tab.Content>
    );
  }
}
export default ActionTab;
