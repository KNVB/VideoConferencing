import ChatMsg from './ChatMsg';
import React from "react";
import UserLeftJoinMsg from './UserLeftJoinMsg';
class ChatBox extends React.Component {
    constructor(props){
        super(props);
        this.previousUserId="";
        this.msgHistory=React.createRef();
        this.state={"history":[]};
        this.sendMsgForm=null;
        this.setFormRef = element => {
            this.sendMsgForm = element;
        };
    }
    addHistory=(msgObj)=>{
        var history=this.state.history;
        history.push(msgObj);
        this.setState({"history":history});
    }
    componentDidMount() {
        this.msgHistory=this.msgHistory.current;
        this.props.meetingControl.userLeftHandler["ChatBox.userLeftHandler"]=this.userLeftHandler;
        this.props.meetingControl.userJoinHandler["ChatBox.userJoinHandler"]=this.userJoinHandler;
        this.props.meetingControl.receiveMsgHandler["ChatBox.receiveMsgHandler"]=this.receiveMsgHandler;
        this.addHistory(
            <UserLeftJoinMsg user={this.props.meetingControl.user} action="join"/>
        );
        this.scrollToBottom();
    }    
    componentDidUpdate() {
        this.scrollToBottom();
    }
    receiveMsgHandler=(info=>{
        //console.log("Receive Message:"+JSON.stringify(info));
        console.log("Receive Message from "+info.alias);
        if (this.previousUserId!==info.userId){
            this.previousUserId=info.userId;
            this.addHistory(<ChatMsg alias={info.alias} msg={info.msg}/>)
        } else {
            this.addHistory(<ChatMsg msg={info.msg}/>)
        }       
        
        /*
        this.addHistory(<div key={(new Date()).getTime()}>{info.alias}:<br/> 
                            {info.msg} &nbsp;&nbsp;&nbsp;
                            <span className="font-italic text-secondary">{Utility.getCurrentTimeString()}</span>
                        </div>);
        */                
    })
    scrollToBottom = () => {
        this.msgHistory.scrollTop=this.msgHistory.scrollHeight;
    }
    sendMsg=(event)=>{
        if (this.sendMsgForm.reportValidity()){
            var msg=this.sendMsgForm.msg.value.trim();
            if (msg===""){
                alert("Please enter message.")
            }else {
                this.props.meetingControl.sendMsg(msg,result=>{
                    this.sendMsgForm.msg.value="";
                    /*
                    this.addHistory(<div key={(new Date()).getTime()}>{this.props.meetingControl.user.alias}:<br/> 
                                        {msg} &nbsp;&nbsp;&nbsp;
                                        <span className="font-italic text-secondary">{Utility.getCurrentTimeString()}</span>
                                    </div>);
                    */                
                });                
            }
        }
        event.preventDefault();
    }
    userJoinHandler=(user=>{
        //console.log("new user join:"+JSON.stringify(user));
        //this.addHistory(<div className="font-italic text-secondary" key={(new Date()).getTime()}>{user.alias} join the meeting @ {Utility.getCurrentTimeString()}</div>);
        this.addHistory(
            <UserLeftJoinMsg user={user} action="join"/>
        );
    });
    userLeftHandler=(user=>{
        //console.log("User Left:"+JSON.stringify(user));
        //this.addHistory(<div className="font-italic text-secondary" key={(new Date()).getTime()}>{user.alias} left the meeting @ {Utility.getCurrentTimeString()}</div>);
        this.addHistory(
            <UserLeftJoinMsg user={user} action="left"/>
        );
    });
    
    render() {
        return (
                <div className="d-flex flex-column flex-grow-1 h-100 p-1 position-absolute w-100">
                    <div className="border border-primary d-flex flex-grow-1 position-relative rounded">
                        <div className="h-100 p-1 overflow-auto position-absolute w-100" ref={this.msgHistory}>
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
