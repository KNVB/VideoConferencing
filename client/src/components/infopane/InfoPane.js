import Card  from 'react-bootstrap/Card';
import ChatBox from './ChatBox';
import MeetingInfo from './MeetingInfo';
import MemberList from './MemberList';
import React from "react";

class InfoPane extends React.Component {
  constructor(props){
    super(props);
    this.paneList={};
    this.chatBox=React.createRef();
    this.meetingInfo=React.createRef();
    this.memberListComponent=React.createRef();
  }
  componentDidMount(){
    this.paneList['chatBox']=this.chatBox.current;
    this.paneList['meetingInfo']=this.meetingInfo.current;
    this.paneList['memberList']=this.memberListComponent.current;
  }
  showPane(paneToBeShown){
    Object.keys(this.paneList).forEach(paneName=>{
      if (paneName===paneToBeShown){
        this.paneList[paneName].show();
      } else {
        this.paneList[paneName].hide();
      }
    })
  }
  render() {
    //console.log("I:"+JSON.stringify(this.props.memberList));
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
          <div className="align-items-end btn d-flex" title="Member List" type="button" onClick={()=>{this.showPane('memberList')}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
            </svg>
          </div>
        </Card.Header>
        <Card.Body className="d-flex flex-grow-1 pb-0 pl-1 pr-1 pt-0">
          <ChatBox ref={this.chatBox}
            meetingInfo={this.props.meetingInfo}
            memberList={this.props.memberList}/>
          <MeetingInfo ref={this.meetingInfo}
            meetingInfo={this.props.meetingInfo}/>
          <MemberList ref={this.memberListComponent}
            meetingInfo={this.props.meetingInfo}
            memberList={this.props.memberList}/>      
        </Card.Body>
        <Card.Footer className="m-1 p-1 rounded">
          <div className="d-flex flex-row justify-content-around pt-1">
              <div className="btn d-flex flex-column just-content-center p-0">
                  <div className="p-0">
                      <svg width="24" height="24" viewBox="0 0 24 24" className="bi bi-mic-fill d-block m-auto" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z"/>
                          <path fillRule="evenodd" d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"/>
                      </svg>
                  </div>
                  <div className="p-0">Mute</div>
              </div>
              <div className="btn d-flex flex-column just-content-center p-0">
                  <div className="p-0">
                      <svg width="24" height="24" viewBox="0 0 24 24" className="bi bi-camera-video d-block m-auto" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M2.667 3.5c-.645 0-1.167.522-1.167 1.167v6.666c0 .645.522 1.167 1.167 1.167h6.666c.645 0 1.167-.522 1.167-1.167V4.667c0-.645-.522-1.167-1.167-1.167H2.667zM.5 4.667C.5 3.47 1.47 2.5 2.667 2.5h6.666c1.197 0 2.167.97 2.167 2.167v6.666c0 1.197-.97 2.167-2.167 2.167H2.667A2.167 2.167 0 0 1 .5 11.333V4.667z"/>
                          <path fillRule="evenodd" d="M11.25 5.65l2.768-1.605a.318.318 0 0 1 .482.263v7.384c0 .228-.26.393-.482.264l-2.767-1.605-.502.865 2.767 1.605c.859.498 1.984-.095 1.984-1.129V4.308c0-1.033-1.125-1.626-1.984-1.128L10.75 4.785l.502.865z"/>
                      </svg>
                  </div>
                  <div className="p-0">Start Video</div>
              </div>
              <div className="align-items-center 
                              btn d-flex                                                
                              flex-column just-content-center 
                              p-0"
                    onClick={this.props.leaveMeeting}>
                  <div className="p-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="sd-block m-auto" width="24" height="24" viewBox="0 0 24 24">
                          <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
                      </svg>
                  </div>                
                  <div className="p-0">Leave</div>
              </div>
          </div>
        </Card.Footer>
      </Card>
    );}
}
export default InfoPane;
