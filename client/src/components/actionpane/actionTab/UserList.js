import {Button, Media,Modal}  from 'react-bootstrap';
import React, { Fragment } from "react";
import RemoteMedia from '../../media/Media';

class UserList extends React.Component {
    constructor(props){
        super(props);
        this.mediaList={};        
        this.state={"joinReq":null,
                    "pendingReq":{}};
    }
    componentDidMount(){
        this.user=this.props.meetingControl.user;
        console.log(this.user.id+" "+this.user.alias);
        this.props.meetingControl.cancelJoinReqHandler["UserList.userCountChangeHandler"]=this.userCountChangeHandler;
        this.props.meetingControl.joinReqHandler["UserList.joinReqHandler"]=this.joinReqHandler;
        this.props.meetingControl.localStreamUpdateHandler["UserList.localStreamUpdateHandler"]=this.localStreamUpdateHandler;
        this.props.meetingControl.remoteStreamHandler["UserList.remoteStreamHandler"]=this.remoteStreamHandler;
        this.props.meetingControl.resetRemoteStreamHandler["UserList.resetRemoteStreamHandler"]=this.resetRemoteStreamHandler;
        this.props.meetingControl.userLeftHandler["UserList.userCountChangeHandler"]=this.userCountChangeHandler;
        this.props.meetingControl.userJoinHandler["UserList.userJoinHandler"]=this.userJoinHandler;
    }
    componentWillUnmount() {
        //this.peer.disconnect();
    }
    acceptRequest=()=>{
        this.props.meetingControl.acceptJoinRequest(this.state.pendingReq.id,(result=>{
            //console.log(this.props.meetingControl.userList);
            this.setState({reqUser:{},
                showApprovModal : false});
        }));
    }
    joinReqHandler=(joinReq)=>{
        this.setState({"joinReq":joinReq});
    }
    localStreamUpdateHandler=(stream=>{
        console.log("local stream updated");
        var media=this.mediaList[this.user.id];
        if (stream){
            media.setStream(stream);
        } else {
            media.closeMedia();
        }
    })
    pendingRequestHandler=(user)=>{
        this.setState({pendingReq:user,
        showApprovModal : true});
    }
   
    rejectRequest=()=>{
        //console.log(this.state.pendingReq);
        this.props.meetingControl.rejectJoinRequest(this.state.pendingReq.id,(result=>{
            this.setState({reqUser:{},
                showApprovModal : false});
        }));        
    }
    remoteStreamHandler=(metadata,stream)=>{
        console.log("Receive stream from "+metadata.alias);
        var media=this.mediaList[metadata.userId];
        media.setStream(stream);
    }
    resetRemoteStreamHandler=(info)=>{
        console.log("Reset Remote Stream Handler");
        var media=this.mediaList[info.userId];
        media.closeMedia();
    }
    userCountChangeHandler=(user=>{
        this.setState({"joinReq":Object.keys(this.props.meetingControl.userList).length});
    })
    userJoinHandler=(user=>{
        console.log(user.alias+" join the meeting");
        this.userCountChangeHandler(user);
    })    
    render() {
        let finalResult=[],pendingReq=[],normalUser=[];
        let thisUser=this.props.meetingControl.user;
        this.mediaList={};
    
        Object.keys(this.props.meetingControl.userList).forEach(userId=>{
            var user=this.props.meetingControl.userList[userId];
            if (user.isHost){
                finalResult.push(<Media className="border-bottom border-info p-1" key={user.id}>
                                    <div className="m-0 p-0" style={{"width":"80px","height":"64px"}}>
                                        <RemoteMedia meetingControl={this.props.meetingControl} 
                                            muted={true}
                                            ref={el=>{this.mediaList[user.id]=el}}/>
                                    </div>
                                    <Media.Body className="align-self-center ml-1">
                                        {user.alias}(Host){(user.id===thisUser.id)?"*":""}
                                    </Media.Body>
                                </Media>);
            } else {
                if (user.id.startsWith("*")){
                    pendingReq.push(<Media className="border-bottom border-info p-1" key={user.id}>
                                        <Media.Body className="align-self-center d-flex flex-row justify-content-around ml-1">
                                            {user.alias}{(user.id===thisUser.id)?"*":""}
                                            <Button variant="primary" onClick={()=>this.pendingRequestHandler(user)}>Pending Approval</Button>
                                        </Media.Body>
                                    </Media>);
                }else {
                    normalUser.push(
                        <Media className="border-bottom border-info p-1" key={user.id}>
                            <div style={{"width":"80px","height":"64px"}}>
                                <RemoteMedia meetingControl={this.props.meetingControl}
                                    muted={false}
                                    ref={el=>{this.mediaList[user.id]=el}}/>
                            </div>
                            <Media.Body className="align-self-center ml-1">
                                {user.alias}{(user.id===thisUser.id)?"*":""}
                            </Media.Body>
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