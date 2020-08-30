import Card  from 'react-bootstrap/Card';
import React from "react";
class InfoPane extends React.Component {
  constructor(props){
    super(props);
    this.paneList={};
    this.chatBox=React.createRef();
    this.meetingInfo=React.createRef();
    this.memberList=React.createRef();
  }
  componentDidMount(){
    this.paneList['chatBox']=this.chatBox.current;
    this.paneList['meetingInfo']=this.meetingInfo.current;
    this.paneList['memberList']=this.memberList.current;
  }
  showPane(paneToBeShown){
    Object.keys(this.paneList).forEach(paneName=>{
      if (paneName===paneToBeShown){
        this.paneList[paneName].classList.remove("d-none");
      } else {
        this.paneList[paneName].classList.add("d-none");
      }
    })
  }
  render() {
    return (
      <Card className="rounded w-100">
        <Card.Header className="d-flex flex-row justify-content-around m-1 p-0 rounded">
          <div className="btn" onClick={()=>{this.showPane('chatBox')}}>1</div>
          <div className="btn" onClick={()=>{this.showPane('meetingInfo')}}>2</div>
          <div className="btn" onClick={()=>{this.showPane('memberList')}}>3</div>
        </Card.Header>
        <Card.Body className="d-flex flex-grow-1 pb-0 pl-1 pr-1 pt-0">
          <Card className="w-100" ref={this.chatBox}>
            <Card.Body className="border border-primary d-flex flex-grow-1 position-relative p-0 rounded">
              <div className="position-absolute h-100 overflow-auto w-100">
                <div>dsfsdf</div>
                <div>dsfsdf</div>
                <div>dsfsdf</div>
                <div>dsfsdf</div>
                <div>dsfsdf</div>
                <div>dsfsdf</div>
                <div>dsfsdf</div>
                <div>dsfsdf</div>
                <div>dsfsdf</div>
                <div>dsfsdf</div>
                <div>dsfsdf</div>
                <div>dsfsdf</div>
                <div>dsfsdf</div>
                <div>dsfsdf</div>
                <div>dsfsdf</div>
                <div>dsfsdf</div>
                <div>dsfsdf</div>
                <div>dsfsdf</div>
                <div>dsfsdf</div>
                <div>dsfsdf</div>
                <div>dsfsdf</div>
                <div>dsfsdf</div>
                <div>dsfsdf</div>
                <div>dsfsdf</div>
              </div>  
            </Card.Body>
            <Card.Footer className="p-1">
              <input type="text" className="w-100"/>
            </Card.Footer>
          </Card>
          <Card className="border border-primary d-none w-100" ref={this.memberList}>
            <Card.Body className="d-flex flex-grow-1 position-relative p-0 rounded">
              <div className="position-absolute h-100 overflow-auto w-100">
                <div>Member List</div>
                <div>dsfsdf</div>
                <div>dsfsdf</div>
                <div>dsfsdf</div>
                <div>dsfsdf</div>
                <div>dsfsdf</div>
                <div>dsfsdf</div>
                <div>dsfsdf</div>
                <div>dsfsdf</div>
                <div>dsfsdf</div>
                <div>dsfsdf</div>
                <div>dsfsdf</div>
                <div>dsfsdf</div>
                <div>dsfsdf</div>
                <div>dsfsdf</div>
                <div>dsfsdf</div>
                <div>dsfsdf</div>
                <div>dsfsdf</div>
                <div>dsfsdf</div>
                <div>dsfsdf</div>
                <div>dsfsdf</div>
                <div>dsfsdf</div>
                <div>dsfsdf</div>
                <div>dsfsdf</div>
              </div>
            </Card.Body>
          </Card>
          <Card className="border border-primary d-none w-100" ref={this.meetingInfo}>
            <Card.Body className="d-flex flex-grow-1 position-relative p-0 rounded">
              <div className="position-absolute h-100 overflow-auto w-100">
                <div>Meeting Info</div>
                <div>dsfsdf</div>
                <div>dsfsdf</div>
                <div>dsfsdf</div>
                <div>dsfsdf</div>
                <div>dsfsdf</div>
                <div>dsfsdf</div>
                <div>dsfsdf</div>
                <div>dsfsdf</div>
                <div>dsfsdf</div>
                <div>dsfsdf</div>
                <div>dsfsdf</div>
                <div>dsfsdf</div>
                <div>dsfsdf</div>
                <div>dsfsdf</div>
                <div>dsfsdf</div>
                <div>dsfsdf</div>
                <div>dsfsdf</div>
                <div>dsfsdf</div>
                <div>dsfsdf</div>
                <div>dsfsdf</div>
                <div>dsfsdf</div>
                <div>dsfsdf</div>
                <div>dsfsdf</div>
              </div>
            </Card.Body>
          </Card>
        </Card.Body>
        <Card.Footer className="m-1 p-1 rounded">F</Card.Footer>
      </Card>
    );
  }
}
export default InfoPane;
