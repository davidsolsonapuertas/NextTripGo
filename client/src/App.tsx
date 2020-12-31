import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import Register from './register/register';
import Login from './login/login';
import Home from './home/home';
import Sidebar from './sidebar/sidebar';
import Profile from './profile/profile';
import RandomVideo from './APIs/pexels/randomvideo/randomvideo';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/register">
            <RandomVideo />
            <Register />
          </Route>
          <Route path="/login">
            <RandomVideo />
            <Login />
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
