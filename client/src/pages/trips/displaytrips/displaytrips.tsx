import React, { useContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  useLocation,
  Link,
} from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Card, Nav, Button } from 'react-bootstrap';

import PastTrips from '../../../components/pasttrips/pasttrips';
import Upcoming from '../../../components/upcomingtrips/upcomingtrips';
import { AuthContext } from '../../../context/auth';
import { FETCH_TRIPS_BY_USERNAME } from '../../../services/queryService';

interface IUser {
  user: any;
  login: (userData: User) => void;
  logout: () => void;
}

interface User {
  username: string;
  password: string;
  token: string;
}

function DisplayTrips() {
  const { user } = useContext<IUser>(AuthContext);
  let { pathname, hash }: any = useLocation();

  let { loading, data } = useQuery(FETCH_TRIPS_BY_USERNAME, {
    variables: { userId: user.id },
    pollInterval: 500,
  });
  console.log(data);

  let trips = data?.getTripsByUsername;
  console.log(trips);

  return (
    <div>
      {pathname === '/trips' && <Redirect to="/trips#upcoming" />}
      {/* Create trip button  */}
      <Link to="/createTrip">
        <button className="btn btn-primary btn-icon-split">
          <span className="icon text-white-50">
            <i className="fas fa-flag"></i>
          </span>
          <span className="text">Create trip</span>
        </button>
      </Link>

      {/* Past and upcoming trips */}
      <Card>
        <Card.Header>
          <Nav variant="tabs" defaultActiveKey="#upcoming">
            <Nav.Item>
              <Nav.Link href="#upcoming">Upcoming</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#past">Past</Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
      </Card>

      {hash === '#past' ? (
        <PastTrips trips={trips} />
      ) : (
        <Upcoming trips={trips} />
      )}
    </div>
  );
}

export default DisplayTrips;
