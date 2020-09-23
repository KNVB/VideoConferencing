import Card  from 'react-bootstrap/Card';
import ChatBox from './ChatBox';
import LeaveButton from './buttons/LeaveButton';
import MeetingInfo from './MeetingInfo';
import MsgButton from './buttons/MsgButton';
import ShareAudioButton from './buttons/ShareAudioButton';
import ShareVideoButton from './buttons/ShareVideoButton';
import UserList from './UserList';
import React from "react";

class ActionPane extends React.Component {
  constructor(props){
    super(props);
    this.chatBox=React.createRef();
    this.meetingInfo=React.createRef();
    this.userList=React.createRef();
    this.paneList={};
    this.state={"userList":this.props.meetingUtil.userList};
  }
  componentDidMount(){
    this.paneList['chatBox']=this.chatBox.current;
    this.paneList['meetingInfo']=this.meetingInfo.current;
    this.paneList['userList']=this.userList.current;

    this.props.meetingUtil.cancelJoinReqHandler.push(this.userCountChangeHandler);
    this.props.meetingUtil.joinReqHandler.push(this.joinReqHandler);
    this.props.meetingUtil.userLeftHandler.push(this.userCountChangeHandler);
    this.props.meetingUtil.newUserJoinHandler.push(this.userCountChangeHandler);
  }
  joinReqHandler=(joinReq)=>{
    this.showPane('userList');
  } 
  userCountChangeHandler=(user)=>{
    this.setState({"userList":this.props.meetingUtil.userList});
  }
  showPane=(paneToBeShown)=>{
    Object.keys(this.paneList).forEach(paneName=>{
      if (paneName===paneToBeShown){
        this.paneList[paneName].show();
      } else {
        this.paneList[paneName].hide();
      }
    })
  }
  render() {
    var userCount="("+ Object.keys(this.state.userList).length +")";
    return (
      <Card className="rounded w-100">
        <Card.Header className="align-items-center d-flex flex-row justify-content-around m-1 p-0 rounded">
          <div className="align-items-center btn d-inline-flex" title="Chat History" onClick={()=>{this.showPane('chatBox')}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/>
            </svg>
          </div>
          <div className="align-items-end btn d-flex" title="Meeting Info" type="button" onClick={()=>{this.showPane('meetingInfo')}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"/>
            </svg>
          </div>
          <div className="align-items-end btn d-flex" title="User List" type="button" onClick={()=>{this.showPane('userList')}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
            </svg>{userCount}
          </div>
        </Card.Header>
        <Card.Body className="d-flex flex-grow-1 pb-0 pl-1 pr-1 pt-0">
          <ChatBox ref={this.chatBox}
            meetingUtil={this.props.meetingUtil}/>
          <MeetingInfo ref={this.meetingInfo}
            meetingUtil={this.props.meetingUtil}/>
          <UserList ref={this.userList}
            meetingUtil={this.props.meetingUtil}/>      
        </Card.Body>
        <Card.Footer className="m-1 p-1 rounded">
          <div className="d-flex flex-row justify-content-around pt-1">
              <ShareAudioButton meetingUtil={this.props.meetingUtil}/>
              <ShareVideoButton meetingUtil={this.props.meetingUtil}/>              
              <LeaveButton meetingUtil={this.props.meetingUtil}/>
          </div>
        </Card.Footer>
      </Card>
    );      
  }
}
export default ActionPane;