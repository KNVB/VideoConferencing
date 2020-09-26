import {Button, Media,Modal}  from 'react-bootstrap';
import React, { Fragment } from "react";
class UserList extends React.Component {
    constructor(props){
        super(props);
        this.state={"userList":this.props.meetingUtil.userList,
                    "pendingReq":{}};
    }
    componentDidMount(){
        this.props.meetingUtil.cancelJoinReqHandler.push(this.userCountChangeHandler);            
        this.props.meetingUtil.joinReqHandler.push(this.joinReqHandler);
        this.props.meetingUtil.userLeftHandler.push(this.userCountChangeHandler);
        this.props.meetingUtil.newUserJoinHandler.push(this.newUserJoinHandler);
    }
    acceptRequest=()=>{
        this.props.meetingUtil.acceptJoinRequest(this.props.meetingUtil.meetingId,this.state.pendingReq.id);
        var userList=this.state.userList;
        delete userList[this.state.pendingReq.id];
        this.setState({reqUser:{},
                        "userList":userList,
                        showApprovModal : false});
    }
    joinReqHandler=(joinReq)=>{
        var ml=this.state.userList;
        ml[joinReq.id]=joinReq;
        this.setState({"userList":ml});
        //console.log('join Request Received.');
    }
    newUserJoinHandler=(user=>{
        console.log(user.alias+" join the meeting");
        this.userCountChangeHandler(user);
    })
    userCountChangeHandler=(user=>{
        this.setState({"userList":this.props.meetingUtil.userList});
    })    
    pendingRequestHandler=(user)=>{
        this.setState({pendingReq:user,
        showApprovModal : true});
    }
    rejectRequest=()=>{
        //console.log(this.state.pendingReq);
        this.props.meetingUtil.rejectJoinRequest(this.props.meetingUtil.meetingId,this.state.pendingReq.id);
        var userList=this.state.userList;
        delete userList[this.state.pendingReq.id];
        this.setState({reqUser:{},
                        "userList":userList,
                        showApprovModal : false});
    }

    render() {
        let finalResult=[],pendingReq=[],normalUser=[];
        let thisUser=this.props.meetingUtil.user;
       
        Object.keys(this.state.userList).forEach(userId=>{
            var user=this.props.meetingUtil.userList[userId];
            if (user.isHost){
                finalResult.push(<Media className="border-bottom border-info" key={user.id}>
                                    <Media.Body>{user.alias}(Host){(user.id===thisUser.id)?"*":""}</Media.Body>
                                </Media>);
            } else {
                if (user.id.startsWith("*")){
                    pendingReq.push(<Media className="border-bottom border-info" key={user.id}>
                                        <Media.Body className="d-flex flex-row justify-content-around">
                                            {user.alias}{(user.id===thisUser.id)?"*":""}
                                            <Button variant="primary" onClick={()=>this.pendingRequestHandler(user)}>Pending Approval</Button>
                                        </Media.Body>
                                    </Media>);
                }else {
                    normalUser.push(
                        <Media className="border-bottom border-info" key={user.id}>
                            <Media.Body>{user.alias}{(user.id===thisUser.id)?"*":""}</Media.Body>
                        </Media>
                    );
                }
            }
        });
        if (pendingReq.length>0){
            finalResult=finalResult.concat(pendingReq);
        }
        if (normalUser.length>0){
            finalResult=finalResult.concat(normalUser);
        }
        return (
            <Fragment>
                <div className="h-100 overflow-auto position-absolute w-100">
                    {finalResult}
                </div>
                <Modal show={this.state.showApprovModal}
                        backdrop="static"
                        keyboard={false}>
                    <Modal.Body className="align-items-center d-flex flex-column justify-content-center">
                        User {this.state.pendingReq.alias} request to join the meeting?
                    </Modal.Body>
                    <Modal.Footer ref={this.modalFooter}>
                        <Button variant="primary" onClick={this.acceptRequest}>Accept</Button>
                        <Button variant="secondary" onClick={this.rejectRequest}>
                            Reject
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Fragment>        
        );
    }
}
export default UserList;
