import {Button,Card, Media}  from 'react-bootstrap';
import React from "react";

class MemberList extends React.Component {
    constructor(props){
        super(props);
        this.memberListComponent=React.createRef();
    }
    hide(){
        this.memberListComponent.current.classList.add("d-none");
    }
    show(){
        this.memberListComponent.current.classList.remove("d-none");
    }
    render(){
        //console.log("M:"+JSON.stringify(this.props.memberList));
        let result=[];
        let thisMember=this.props.meetingInfo.user;
        result[0]="";
        Object.keys(this.props.memberList).forEach(memberId=>{
            var member=this.props.memberList[memberId];
            if (member.isHost){
                result[0]=<Media className="border-bottom border-info" key={member.id}><Media.Body>{member.alias}(Host){(member.id===thisMember.id)?"*":""}</Media.Body></Media>
            } else {
                if (member.id.startsWith("*")){
                    result.push(<Media className="border-bottom border-info" key={member.id}>
                                    <Media.Body className="d-flex flex-row justify-content-around">
                                        {member.alias}{(member.id===thisMember.id)?"*":""}
                                        <Button variant="primary" onClick={()=>this.props.approvalHandler(member)}>Pending Approval</Button>
                                    </Media.Body>
                                </Media>);
                } else {
                    result.push(<Media className="border-bottom border-info" key={member.id}><Media.Body>{member.alias}{(member.id===thisMember.id)?"*":""}</Media.Body></Media>);
                }
            }
        })
        return (
            <Card className="border border-primary w-100" ref={this.memberListComponent}>
                <Card.Body className="d-flex flex-grow-1 position-relative p-0 rounded">
                    <div className="position-absolute h-100 overflow-auto w-100">
                        {result}
                    </div>
                </Card.Body>
            </Card>
        )
    }
}
export default MemberList