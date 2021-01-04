import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './bootstrap.css';
import './App.css';

import { AuthProvider } from './context/auth';

import PrivateRoute from './util/privateroute/privateroute';
import AuthRoute from './util/authroute/authroute';
import Register from './pages/register/register';
import Login from './pages/login/login';
import Home from './pages/home/home';
import Profile from './pages/profile/profile';
import RandomVideo from './APIs/pexels/randomvideo/randomvideo';
import DisplayTrips from './pages/trips/displaytrips/displaytrips';
import CreateTrip from './pages/trips/createtrip/createtrip';
import TripDetail from './pages/trips/tripdetail/tripdetail';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <Switch>
            <AuthRoute path="/register">
              <RandomVideo />
              <Register />
            </AuthRoute>
            <AuthRoute path="/login">
              <RandomVideo />
              <Login />
            </AuthRoute>
            <PrivateRoute path="/me">
              <Profile />
            </PrivateRoute>
            <PrivateRoute path="/trips/:id">
              <TripDetail />
            </PrivateRoute>
            <PrivateRoute path="/trips">
              <DisplayTrips />
            </PrivateRoute>
            <PrivateRoute path="/createTrip">
              <CreateTrip />
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
