import ChatButton from "./navButtons/ChatButton";
import MeetingInfoButton from './navButtons/MeetingInfoButton';
import React from "react";
import UserListButton from './navButtons/UserListButton';
import $ from "jquery/dist/jquery.js";
import "./NavButton.css";
import { Nav } from "react-bootstrap";
class NavBar extends React.Component {
  constructor(props){
    super(props);
    this.nav=React.createRef();
  }
  componentDidMount(){
    this.props.meetingControl.joinReqHandler["NavBar.joinReqHandler"]=this.joinReqHandler;
    this.nav=this.nav.current;  
  }
 
  joinReqHandler=(joinReq)=>{
    $(this.nav).find('a[href="#userList"]').tab('show');
  }
  render() {
    return (
      <Nav as="ul" className="p-0 m-0" justify={true} ref={this.nav} variant="pills">
        <ChatButton meetingControl={this.props.meetingControl}/>
        <MeetingInfoButton  meetingControl={this.props.meetingControl}/>
        <UserListButton  meetingControl={this.props.meetingControl}/>
      </Nav>
    );
  }
}
export default NavBar;
