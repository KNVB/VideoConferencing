import Card  from 'react-bootstrap/Card';
import React from "react";

class ChatBox extends React.Component {
    constructor(props){
        super(props);
        this.chatBox=React.createRef();
    }
    hide(){
        this.chatBox.current.classList.add("d-none");
    }
    show(){
        this.chatBox.current.classList.remove("d-none");
    }
    render(){
        return (
            <Card className="d-none w-100" ref={this.chatBox}>
                <Card.Body className="border border-primary d-flex flex-grow-1 position-relative p-0 rounded">
                    <div className="position-absolute h-100 overflow-auto w-100">
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
                    </div>  
                    </Card.Body>
                <Card.Footer className="p-1">
                <input type="text" className="w-100"/>
                </Card.Footer>
            </Card>
        )
    }
}    
export default ChatBox;