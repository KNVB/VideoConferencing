import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CreateMeeting from "./routes/CreateMeeting";
import FirstForm from "./FirstForm";
import Info from "./routes/Info";
import JoinMeeting from "./routes/JoinMeeting";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
            <Route exact path='/' component={FirstForm} />
            <Route exact path='/Info' component={Info} />
            <Route exact path='/createMeeting' component={CreateMeeting} />
            <Route exact path='/joinMeeting' component={JoinMeeting} />
        </Switch>
      </Router>
    );
  }
}

export default App;
