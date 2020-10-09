import config from '../../../utils/config';
import {Button, Media,Modal}  from 'react-bootstrap';
import React, { Fragment } from "react";
import RemoteMedia from '../../media/Media';
import Peer from "peerjs";
class UserList extends React.Component {
    constructor(props){
        super(props);
        this.mediaList=[];        
        this.state={"userList":this.props.meetingUtil.userList,
                    "pendingReq":{}};
    }
    componentDidMount(){
        this.user=this.props.meetingUtil.user;
        this.props.meetingUtil.cancelJoinReqHandler.push(this.userCountChangeHandler);            
        this.props.meetingUtil.joinReqHandler.push(this.joinReqHandler);
        this.props.meetingUtil.localStreamUpdateHandler.push(this.localStreamUpdateHandler);
        this.props.meetingUtil.newUserJoinHandler.push(this.newUserJoinHandler);
        this.props.meetingUtil.resetRemoteStreamHandler.push(this.resetRemoteStreamHandler);
        this.props.meetingUtil.userLeftHandler.push(this.userCountChangeHandler);
        console.log(this.user.id+" "+this.user.alias);
        this.peer=new Peer(this.user.id,{host:"/",path:"/peerServer",port:config.API_PORT,debug:2});
        this.peer.on("call",call=>{
            var mediaList=this.mediaList;
            var meetingUtil=this.props.meetingUtil;
            call.answer(this.props.meetingUtil.localStream); //Before getting the remote stream, answer the call with the stream;
            call.on('stream', function(remoteStream) {
                console.log("The Receive Call from "+call.metadata.alias);  
                console.log("The Local Stream is "+((meetingUtil.localStream)?"Object":"null"));
                console.log("The Remote Stream is "+((remoteStream)?"Object":"null"));
                console.log("The Remote Stream has "+((remoteStream.getAudioTracks().length>0)?"":"no")+" audio track");
                console.log("The Remote Stream has "+((remoteStream.getVideoTracks().length>0)?"":"no")+" video track");
                var media=mediaList[call.metadata.userId];
                media.setStream(remoteStream);
            });
        });
        this.props.meetingUtil.sendLocalStreamToOthers(this.peer);
    }
    componentWillUnmount() {
        this.peer.disconnect();
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
    localStreamUpdateHandler=(stream=>{
        console.log("local stream updated");
        var media=this.mediaList[this.user.id];
        if (stream){
            media.setStream(stream);
        } else {
            media.closeMedia();
        }
        this.props.meetingUtil.sendLocalStreamToOthers(this.peer);
    });
    newUserJoinHandler=(user=>{
        console.log(user.alias+" join the meeting");
        this.userCountChangeHandler(user);
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
    resetRemoteStreamHandler=(info)=>{
        console.log("Reset Remote Stream Handler");
        var media=this.mediaList[info.userId];
        media.closeMedia();
    }
    userCountChangeHandler=(user=>{
        this.setState({"userList":this.props.meetingUtil.userList});
    })    
    render() {
        let finalResult=[],pendingReq=[],normalUser=[];
        let thisUser=this.props.meetingUtil.user;
        this.mediaList={};
        Object.keys(this.state.userList).forEach(userId=>{
            var user=this.props.meetingUtil.userList[userId];
            if (user.isHost){
                finalResult.push(<Media className="border-bottom border-info p-1" key={user.id}>
                                    <div className="m-0 p-0" style={{"width":"80px","height":"64px"}}>
                                        <RemoteMedia meetingUtil={this.props.meetingUtil} 
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
                                <RemoteMedia meetingUtil={this.props.meetingUtil}
                                    muted={true}
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
