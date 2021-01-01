import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';

import { AuthProvider } from './context/auth';

import PrivateRoute from './components/privateroute/privateroute';
import Register from './pages/register/register';
import Login from './pages/login/login';
import Home from './pages/home/home';
import Profile from './pages/profile/profile';
import RandomVideo from './APIs/pexels/randomvideo/randomvideo';

function App() {
  return (
    <AuthProvider>
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
            <PrivateRoute path="/me">
              <Profile />
            </PrivateRoute>
            <PrivateRoute path="/">
              <Home />
            </PrivateRoute>
          </Switch>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
