import React from "react";
import Utility from '../../../../utils/Utility';
class ChatBox extends React.Component {
    /*
    constructor(props){
        super(props);
    }
    */
    render() {
        let header;
        if (this.props.alias===undefined){
            header=null;
        } else {
            header=<div className="font-weight-bold p-1 rounded" style={{"color":this.props.nameColor}}>{this.props.alias}</div>
        }
        return (
            <div className="border border-info rounded mb-1">
                {header}
                <div className="p-1">
                    {this.props.msg}
                </div>
                <div className="d-flex justify-content-end p-1 text-secondary">
                    {Utility.getCurrentTimeString()}
                </div>
            </div>
        )
    }
} 
export default ChatBox   