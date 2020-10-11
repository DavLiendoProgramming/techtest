import './App.css';
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import PeopleStore from './pages/people/PeopleStore';
import PeopleConnector from './pages/people/PeopleConnector';
import TableConnector from './pages/react-table/TableConnector';
import { Sidebar } from './sidebar/Sidebar';
import { Landing } from './pages/Landing';
import { Jobs } from './pages/jobs/Jobs';
import About from './pages/About';
function App() {
  return (
    <Fragment>
      <Router>
        <div id="wrapper">
          <Sidebar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/about" component={About} />
            <Route exact path="/jobs" component={Jobs} />
            <Provider store={PeopleStore}>
              <Route exact path="/table" component={TableConnector} />
              <Route exact path="/people" component={PeopleConnector} />
            </Provider>
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
