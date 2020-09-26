import {Tab} from "react-bootstrap";
import React from "react";
import MeetingInfo from "./MeetingInfo";
import UserList from "./UserList";
import ChatBox from "./ChatBox";
class ActionTab extends React.Component {
  render() {
    return (
      <Tab.Content className="d-flex flex-grow-1">
        <Tab.Pane
          active={true}
          className="border border-primary container p-1 rounded"
          id="meetingInfo">
            <MeetingInfo meetingUtil={this.props.meetingUtil}/>    
        </Tab.Pane>
        <Tab.Pane
          className="border border-primary container fade p-0 position-relative rounded"
          id="userList">
            <UserList meetingUtil={this.props.meetingUtil}/>  
        </Tab.Pane>
        <Tab.Pane
          className="border border-primary container fade p-0 position-relative rounded"
          id="chatBox">
            <ChatBox meetingUtil={this.props.meetingUtil}/>
        </Tab.Pane>
      </Tab.Content>
    );
  }
}
export default ActionTab;
