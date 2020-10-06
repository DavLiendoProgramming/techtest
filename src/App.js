import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { Sidebar } from './sidebar/Sidebar';
import { Landing } from './pages/Landing';
import { Jobs } from './pages/jobs/Jobs';
import { People } from './pages/people/People';
import { About } from './pages/About';
function App() {
  return (
    <Fragment>
      <Router>
        <div id="wrapper">
          <Sidebar />
          <Route exact path="/" component={Landing} />
          <Switch>
            <Route exact path="/jobs" component={Jobs} />
            <Route exact path="/people" component={People} />
            <Route exact path="/about" component={About} />
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
