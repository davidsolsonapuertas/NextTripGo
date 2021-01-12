import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Dropdown from 'react-bootstrap/Dropdown';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { Trip } from '../../Interfaces/Trip';
import Logo from '../../assets/logo.png';
import './tripcards.css';

type IProps = {
  trips: Trip[];
  time: String;
};

function TripCards({ trips, time }: IProps) {
  if (typeof trips !== 'undefined') {
    trips = trips.filter((trip) => {
      if (time === 'past') {
        return trip.fromDate < new Date().toISOString();
      } else {
        return trip.fromDate > new Date().toISOString();
      }
    });
  }

  return (
    <div className="d-flex mt-4 justify-content-center flex-wrap">
      {trips &&
        trips.map((trip: Trip) => {
          return (
            <div
              key={trip.id}
              // style={{ maxWidth: '30%' }}
              className="mx-3 card shadow mb-4"
            >
              <Link to={'/trips/' + trip.id}>
                <Card.Img
                  className="img-thumbnail mb-1"
                  src={trip.picture ? trip.picture : Logo}
                />
              </Link>
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">
                  <Link to={'/trips/' + trip.id}>{trip.destination}</Link>
                </h6>
                <div className="dropdown no-arrow">
                  <Dropdown>
                    <Dropdown.Toggle variant="link" id="dropdown-basic">
                      <MoreVertIcon />
                    </Dropdown.Toggle>
                    <Dropdown.Menu align="right">
                      <Dropdown.Item variant="danger" href="#/delete">
                        Delete
                      </Dropdown.Item>
                      <Dropdown.Item href={'#edit' + trip.id}>
                        Edit
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
              <div className="card-body">
                {moment(trip.fromDate).format('MMM Do YY')} {' – '}
                {moment(trip.toDate).format('MMM Do YY')}
              </div>
              <Button
                href={'/trips/' + trip.id}
                className="rounded-0"
                variant="primary"
              >
                See trip
              </Button>
            </div>
          );
        })}
    </div>
  );
}

export default TripCards;
