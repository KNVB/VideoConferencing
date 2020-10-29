import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CreateMeeting from "./routes/CreateMeeting";
import FirstForm from "./FirstForm";
import Info from "./routes/Info";
import JoinMeeting from "./routes/JoinMeeting";
import SecureRoute from './routes/SecureRoute';
//import Template from './firstTemplate/Template';
import TestPeer from './TestPeer';
import TestWebRtc from './TestWebRtc';
import CurrentTemplate from './currentTemplate/TestNav';
class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
            <Route exact path='/TestWebRtc/:userId' component={TestWebRtc}/>
            <Route exact path='/TestPeer/:userId' component={TestPeer} />
            <Route exact path='/' component={FirstForm} />
            <Route exact path='/Info' component={Info} />
            <Route exact path='/createMeeting/' component={CreateMeeting} />
            <Route exact path='/joinMeeting/' component={JoinMeeting} />
            <Route exact path='/joinMeeting/:meetingId' component={JoinMeeting} />
            <Route exact path='/meeting/:meetingId' component={SecureRoute} />
            <Route exact path='/template' component={CurrentTemplate}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
