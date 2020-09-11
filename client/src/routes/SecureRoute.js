/*
import io from 'socket.io-client';
import {SOCKET_URL} from '../utils/fetch';
import fetchApi from '../utils/fetch';
*/
import React from 'react';
import { Redirect,Route } from "react-router-dom";
import Meeting from '../components/meeting/Meeting';

class SecuredRoute extends React.Component {
    render() {
        if (sessionStorage.getItem("meetingInfo")!==null){
            return  <Route path={this.props.path} component={Meeting} exact={true}/> 
        } else {
            alert("The access for this meeting is invalid, please login first.");
            return <Redirect to="/"/>
        }
    }    
}
export default SecuredRoute