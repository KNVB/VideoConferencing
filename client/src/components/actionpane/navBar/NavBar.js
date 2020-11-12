import ChatButton from "./navButtons/ChatButton";
import MeetingInfoButton from './navButtons/MeetingInfoButton';
import React from "react";
import UserListButton from './navButtons/UserListButton';

import "./NavButton.css";
import { Nav } from "react-bootstrap";
class NavBar extends React.Component {
  render() {
    return (
      <Nav as="ul" 
        className="p-0 m-0" 
        onSelect={(selectedKey) => this.props.onSelect(selectedKey)} 
        justify={true} variant="pills">
        <ChatButton meetingControl={this.props.meetingControl}/>
        <MeetingInfoButton  meetingControl={this.props.meetingControl}/>
        <UserListButton  meetingControl={this.props.meetingControl}/>
      </Nav>
    );
  }
}
export default NavBar;
