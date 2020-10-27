import React from 'react';
import { Redirect,Route } from "react-router-dom";
import Meeting from '../components/meeting/Meeting';
import Utility from '../utils/Utility';
class SecuredRoute extends React.Component {
    render() {
        if (Utility.getMeetingInfo()===null){
            alert("The access for this meeting is invalid, please login first.");
            return <Redirect to="/"/>
        } else {
            return  <Route path={this.props.path} component={Meeting} exact={true}/> 
        }
    }    
}
export default SecuredRoute