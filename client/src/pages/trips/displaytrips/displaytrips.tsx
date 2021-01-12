import React, { useContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  useLocation,
  Link,
} from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Card, Nav } from 'react-bootstrap';
import FlightTakeoffRoundedIcon from '@material-ui/icons/FlightTakeoffRounded';

import TripCards from '../../../Components/TripCards/TripCards';
import { AuthContext } from '../../../Context/Auth';
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

  let trips = data?.getTripsByUsername;

  return (
    <div>
      {pathname === '/trips' && <Redirect to="/trips#upcoming" />}
      <Card className="rounded-0">
        <Card.Header className="d-flex">
          <Nav variant="tabs" defaultActiveKey="#upcoming">
            <Nav.Item>
              <Nav.Link href="#upcoming">Upcoming</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#past">Past</Nav.Link>
            </Nav.Item>

            <div className="float-right">
              <Link to="/createTrip">
                <button className="btn btn-primary btn-icon-split">
                  <span className="icon text-white-50">
                    <FlightTakeoffRoundedIcon />
                  </span>
                  <span className="text">Create trip</span>
                </button>
              </Link>
            </div>
          </Nav>
        </Card.Header>
      </Card>

      {trips?.length && hash === '#past' ? (
        <TripCards trips={trips} time={'past'} />
      ) : (
        <TripCards trips={trips} time={'upcoming'} />
      )}
    </div>
  );
}

export default DisplayTrips;
