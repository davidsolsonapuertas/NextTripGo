import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import Register from './register/register';
import Home from './home/home';
import Sidebar from './sidebar/sidebar';
import Profile from './profile/profile';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/me">
            <div className="sidebar">
              <Sidebar />
            </div>
            <Profile />
          </Route>
          {/* <Route path="/users"><Users /></Route> */}
          <Route path="/">
            <div className="sidebar">
              <Sidebar />
            </div>
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
