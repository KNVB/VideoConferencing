import React from "react";
import Utility from '../../../utils/Utility';
class ChatBox extends React.Component {
    constructor(props){
        super(props);
        this.state={"history":[]};
        this.sendMsgForm=null;
        this.setFormRef = element => {
            this.sendMsgForm = element;
        };
    }
    componentDidMount() {
        this.props.meetingUtil.userLeftHandler.push(this.userLeftHandler);
        this.props.meetingUtil.newUserJoinHandler.push(this.userJoinHandler);
        this.props.meetingUtil.receiveMsgHandler.push(this.receiveMsgHandler);
        var history=this.state.history;
        history.push(<div className="font-italic text-secondary" key={(new Date()).getTime()}>{this.props.meetingUtil.user.alias} join the meeting @ {Utility.getCurrentTimeString()}</div>)
        this.setState({"history":history});
    }
    userJoinHandler=(user=>{
        //console.log("new user join:"+JSON.stringify(user));
        var history=this.state.history;
        history.push(<div className="font-italic text-secondary" key={(new Date()).getTime()}>{user.alias} join the meeting @ {Utility.getCurrentTimeString()}</div>)
        this.setState({"history":history});
    });
    userLeftHandler=(user=>{
        //console.log("User Left:"+JSON.stringify(user));
        var history=this.state.history;
        history.push(<div className="font-italic text-secondary" key={(new Date()).getTime()}>{user.alias} left the meeting @ {Utility.getCurrentTimeString()}</div>)
        this.setState({"history":history});
    });
    receiveMsgHandler=(info=>{
        //console.log("Receive Message:"+JSON.stringify(info));
        console.log("Receive Message from "+info.alias);
        var history=this.state.history;
        history.push(<div key={(new Date()).getTime()}>{info.alias}:<br/> 
                            {info.msg} &nbsp;&nbsp;&nbsp;
                            <span className="font-italic text-secondary">{Utility.getCurrentTimeString()}</span></div>)
        this.setState({"history":history});
    })
    sendMsg=(event)=>{
        if (this.sendMsgForm.reportValidity()){
            var msg=this.sendMsgForm.msg.value.trim();
            if (msg===""){
                alert("Please enter message.")
            }else {
                this.props.meetingUtil.sendMsg(msg);
                this.sendMsgForm.msg.value="";
            }
        }
        event.preventDefault();
    }
    render() {
        return (
                <div className="d-flex flex-column flex-grow-1 h-100 p-1 position-absolute w-100">
                    <div className="border border-primary d-flex flex-grow-1 position-relative rounded">
                        <div className="h-100 p-1 overflow-auto position-absolute w-100">
                            {this.state.history}
                        </div>
                    </div>
                    <form className="mt-1" ref={this.setFormRef}>
                        <input required type="text" name="msg" placeholder="Send message to all user"/>
                        <button style={{"float":"right"}} variant="primary" onClick={this.sendMsg}>
                            Send
                        </button>
                    </form>
                </div>            
        );
    }
}
export default ChatBox;
