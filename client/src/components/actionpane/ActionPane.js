import {Card}  from 'react-bootstrap';
import LeaveButton from './buttons/LeaveButton';
import NavBar from './navBar/NavBar';
import ActionTab from './actionTab/ActionTab';
import React from "react";

class ActionPane extends React.Component {
  render() {
    return (
      <Card className="rounded w-100">
        <Card.Header className="p-1 m-1 rounded">
          <NavBar meetingUtil={this.props.meetingUtil}/>
        </Card.Header>
        <Card.Body className="d-flex flex-grow-1 pb-0 pl-1 pr-1 pt-0 w-100">
          <ActionTab meetingUtil={this.props.meetingUtil}/>          
        </Card.Body>
        <Card.Footer className="m-1 p-1 rounded">
          <div className="d-flex flex-row justify-content-around pt-1">
              <LeaveButton meetingUtil={this.props.meetingUtil}/>
          </div>
        </Card.Footer>
      </Card>  
    );
  }
}
export default ActionPane;