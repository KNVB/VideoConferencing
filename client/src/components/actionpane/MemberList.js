import {Button,Card, Media,Modal}  from 'react-bootstrap';
import React, { Fragment } from "react";

class MemberList extends React.Component {
    constructor(props){
        super(props);
        this.memberListComponent=React.createRef();
        this.state={"memberList":this.props.meetingUtil.memberList,
                    "pendingReq":{}};
        this.props.meetingUtil.joinReqHandler.push(this.joinReqHandler);
    }
    componentDidMount(){
        
    }
    hide(){
        this.memberListComponent.current.classList.add("d-none");
    }
    show(){
        this.memberListComponent.current.classList.remove("d-none");
    }
    joinReqHandler=(joinReq)=>{
        var ml=this.state.memberList;
        ml[joinReq.id]=joinReq;
        this.setState({"memberList":ml});
        console.log('join Request.');
    }
    pendingRequestHandler=(user)=>{
        this.setState({pendingReq:user,
        showApprovModal : true});
    }
    rejectRequest=()=>{
        this.meetingUtil.rejectJoinRequest(this.props.meetingUtil.meetingId,this.state.pendingReq.id);
        var memberList=this.state.memberList;
        delete memberList[this.state.reqUser.id];
        this.setState({reqUser:{},
                        "memberList":memberList,
                        showApprovModal : false});
    }
    render(){
        //console.log("M:"+JSON.stringify(this.props.memberList));
        let finalResult=[],pendingReq=[],normalMember=[];
        let thisMember=this.props.meetingUtil.user;
        console.log(this.state.memberList);
        Object.keys(this.state.memberList).forEach(memberId=>{
            var member=this.props.meetingUtil.memberList[memberId];
            if (member.isHost){
                finalResult.push(<Media className="border-bottom border-info" key={member.id}>
                                    <Media.Body>{member.alias}(Host){(member.id===thisMember.id)?"*":""}</Media.Body>
                                </Media>);
            } else {
                if (member.id.startsWith("*")){
                    pendingReq.push(<Media className="border-bottom border-info" key={member.id}>
                                        <Media.Body className="d-flex flex-row justify-content-around">
                                            {member.alias}{(member.id===thisMember.id)?"*":""}
                                            <Button variant="primary" onClick={()=>this.pendingRequestHandler(member)}>Pending Approval</Button>
                                        </Media.Body>
                                    </Media>);
                }else {
                    normalMember.push(
                        <Media className="border-bottom border-info" key={member.id}>
                            <Media.Body>{member.alias}{(member.id===thisMember.id)?"*":""}</Media.Body>
                        </Media>
                    );
                }
            }
        });
        if (pendingReq.length>0){
            finalResult=finalResult.concat(pendingReq);
        }
        if (normalMember.length>0){
            finalResult=finalResult.concat(normalMember);
        }
        console.log(finalResult);
        return (
            <Fragment>
                <Card className="border border-primary w-100" ref={this.memberListComponent}>
                    <Card.Body className="d-flex flex-grow-1 position-relative p-0 rounded">
                        <div className="position-absolute h-100 overflow-auto w-100">
                            {finalResult}
                        </div>
                    </Card.Body>
                </Card>
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
        )
    }
}
export default MemberList