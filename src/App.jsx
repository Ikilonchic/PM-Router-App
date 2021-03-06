import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import styles from './App.module.scss';

import Header from './components/Header/Header';

import Weather from './components/Weather/Weather';
import Retrospective from './components/Retrospective/Retrospective';
import ToDo from './components/ToDo/ToDo';

function App() {
  return (
    <Router>
      <div className={styles['app']}>
        <Header>
          <Link to="/weather">Weather</Link>
          <Link to="/retrospective">Retrospective</Link>
          <Link to="/todo">ToDo</Link>
        </Header>
        <main className={styles['app__window']}>
          <Switch>
            <Route path="/weather" exact>
              <Weather city='Dnipro'/>
            </Route>
            <Route path="/retrospective" exact>
              <Retrospective />
            </Route>
            <Route path="/todo" exact>
              <ToDo/>
            </Route>
            <Route>
              <Redirect to="/weather"/>
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
