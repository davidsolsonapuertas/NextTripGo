import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  useLocation,
} from 'react-router-dom';

import './App.css';
import Home from './home/home';
import Sidebar from './sidebar/sidebar';
import Topbar from './topbar/topbar';
import Profile from './profile/profile';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="sidebar">
          <Sidebar />
        </div>
        {/* <div className="topbar">
          <Topbar />
        </div> */}
        <div className="elements">
          <Switch>
            <Route path="/me">
              <Profile />
            </Route>
            {/* <Route path="/users"><Users /></Route> */}
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
