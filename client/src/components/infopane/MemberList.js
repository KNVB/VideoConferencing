import Card  from 'react-bootstrap/Card';
import React from "react";

class MemberList extends React.Component {
    constructor(props){
        super(props);
        this.memberList=React.createRef();
    }
    hide(){
        this.memberList.current.classList.add("d-none");
    }
    show(){
        this.memberList.current.classList.remove("d-none");
    }
    render(){
        return (
            <Card className="border border-primary w-100" ref={this.memberList}>
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
        )
    }
}
export default MemberList