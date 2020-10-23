import React from "react";
import Utility from '../../../../utils/Utility';
class UserLeftJoinMsg extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="font-italic text-secondary" key={(new Date()).getTime()}>
                {this.props.user.alias} {this.props.action} the meeting @ {Utility.getCurrentTimeString()}
            </div>
        )
    }
}
export default UserLeftJoinMsg