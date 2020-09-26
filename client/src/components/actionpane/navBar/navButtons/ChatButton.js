import { Nav } from "react-bootstrap";
import React from "react";
class ChatButton extends React.Component {
  constructor(props){
    super(props);
    this.state={"msgCount":0};
  }
  componentDidMount(){
    this.props.meetingUtil.receiveMsgHandler.push(this.receiveMsgHandler);
  }
  clearCount=()=>{
    this.setState({"msgCount":0});
  }
  receiveMsgHandler=(info=>{
    var count=this.state.msgCount+1;
    this.setState({"msgCount":count});
  });
  render() {
    var count="";
    if (this.state.msgCount>0){
      count="("+this.state.msgCount+")"
    }
    return (
      <Nav.Item as="li" title="Chat History">
        <Nav.Link data-toggle="pill" href="#chatBox">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24">
              <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" />
          </svg>{count}
        </Nav.Link>
      </Nav.Item>
    );
  }
}
export default ChatButton;
