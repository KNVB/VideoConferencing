import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import FirstForm from "./FirstForm";
import Info from "./Info";
class App extends Component {
  render() {
    return (
    <Router>
        <div>
          <Switch>
              <Route exact path='/' component={FirstForm} />
              <Route exact path='/Info' component={Info} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;