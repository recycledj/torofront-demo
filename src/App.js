import React, { Fragment } from 'react';

// routes
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// import views
import Dashboard from './views/Dashboard/Dashboard';
import Steers from './views/Steers';
import './App.css';

function App() {
  return (
    <Fragment>
      <Router>
        <Switch>
          <Route exec path="/dashboard" component={Dashboard} />
          <Route exec path="/steers" component={Steers} />
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
