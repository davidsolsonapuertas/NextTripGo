import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import './bootstrap.css';
import './App.css';

import { AuthProvider } from './Context/Auth';

import PrivateRoute from './util/PrivateRoute/PrivateRoute';
import AuthRoute from './util/AuthRoute/AuthRoute';
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import Profile from './Pages/Profile/Profile';
import RandomVideo from './APIs/Pexels/RandomVideo/RandomVideo';
import DisplayTrips from './Pages/Trips/DisplayTrips/DisplayTrips';
import CreateTrip from './Pages/Trips/CreateTrip/CreateTrip';
import TripDetail from './Pages/Trips/TripDetail/TripDetail';
import PageNotFound from './Pages/404';
import UserProfile from './Pages/UserProfile/UserProfile';

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
            <PrivateRoute exact path="/user/:id">
              <UserProfile />
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
