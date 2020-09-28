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
    this.props.meetingUtil.joinReqHandler.push(this.joinReqHandler);
    this.nav=this.nav.current;  
  }
 
  joinReqHandler=(joinReq)=>{
    $(this.nav).find('a[href="#userList"]').tab('show');
  }
  render() {
    return (
      <Nav as="ul" className="p-0 m-0" justify={true} ref={this.nav} variant="pills">
        <ChatButton meetingUtil={this.props.meetingUtil}/>
        <MeetingInfoButton  meetingUtil={this.props.meetingUtil}/>
        <UserListButton  meetingUtil={this.props.meetingUtil}/>
      </Nav>
    );
  }
}
export default NavBar;
