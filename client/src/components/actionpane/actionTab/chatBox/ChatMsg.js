import React from "react";
import Utility from '../../../../utils/Utility';
class ChatBox extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        var header;
        if (this.props.alias===undefined){
            header=null;
        } else {
            header=<div className="bg-primary border-bottom border-primary p-1 text-white">{this.props.alias}</div>
        }
        return (
            <div className="border border-primary rounded mb-1">
                {header}
                <div className="p-1">
                    {this.props.msg}
                </div>
                <div className="d-flex justify-content-end p-1">{Utility.getCurrentTimeString()}</div>
            </div>
        )
    }
} 
export default ChatBox   