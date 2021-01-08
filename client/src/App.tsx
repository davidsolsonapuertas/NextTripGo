import React, { useEffect, useContext } from 'react';
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
import PageNotFound from './pages/404';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <Switch>
            <AuthRoute exact path="/register">
              <RandomVideo />
              <Register />
            </AuthRoute>
            <AuthRoute exact path="/login">
              <RandomVideo />
              <Login />
            </AuthRoute>
            <PrivateRoute exact path="/me">
              <Profile />
            </PrivateRoute>
            <PrivateRoute exact path="/trips/:id">
              <TripDetail />
            </PrivateRoute>
            <PrivateRoute exact path="/trips">
              <DisplayTrips />
            </PrivateRoute>
            <PrivateRoute exact path="/createTrip">
              <CreateTrip />
            </PrivateRoute>
            <PrivateRoute exact path="/">
              <Home />
            </PrivateRoute>
            <PrivateRoute path="/">
              <PageNotFound />
            </PrivateRoute>
          </Switch>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
