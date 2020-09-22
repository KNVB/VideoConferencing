import { Button,Card } from 'react-bootstrap';
import React from "react";
import Utility from '../../utils/Utility';
class ChatBox extends React.Component {
    constructor(props){
        super(props);
        this.state={"history":[]};
        this.chatBox=React.createRef();
        this.messageBox=React.createRef();
    }
    componentDidMount() {
        this.messageBox=this.messageBox.current;
        this.props.meetingUtil.memberLeftHandler.push(this.memberLeftHandler);
        this.props.meetingUtil.newMemberJoinHandler.push(this.memberJoinHandler);
        this.props.meetingUtil.receiveMsgHandler.push(this.receiveMsgHandler);
    }
    hide(){
        this.chatBox.current.classList.add("d-none");
    }
    memberJoinHandler=(user=>{
        console.log("Member join:"+JSON.stringify(user));
        var history=this.state.history;
        history.push(<div className="font-italic text-secondary">{user.alias} join the meeting @ {Utility.getCurrentTimeString()}</div>)
        this.setState({"history":history});
    });
    memberLeftHandler=(user=>{
        console.log("Member Left:"+JSON.stringify(user));
        var history=this.state.history;
        history.push(<div className="font-italic text-secondary">{user.alias} left the meeting @ {Utility.getCurrentTimeString()}</div>)
        this.setState({"history":history});
    });
    receiveMsgHandler=(info=>{
        console.log("Receive Message:"+JSON.stringify(info));
    })
    sendMsg=()=>{
        var msg=this.messageBox.value.trim();
        if (msg===""){
            alert("Please enter message.")
        }else {
            this.props.meetingUtil.sendMsg(msg);
        }
    }
    show(){
        this.chatBox.current.classList.remove("d-none");
    }
    render(){
        return (
            <Card className="d-none w-100" ref={this.chatBox}>
                <Card.Body className="border border-primary d-flex flex-grow-1 position-relative p-0 rounded">
                    <div className="position-absolute h-100 overflow-auto w-100">
                        {this.state.history}
                        {/*
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
                        */}
                    </div>  
                    </Card.Body>
                <Card.Footer className="p-1">
                    <input required type="text" ref={this.messageBox} placeholder="Send Message to all member"/>
                    <Button style={{"float":"right"}} variant="primary" onClick={this.sendMsg}>
                        Send
                    </Button>
                </Card.Footer>
            </Card>
        )
    }
}    
export default ChatBox;