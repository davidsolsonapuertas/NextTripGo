import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import moment from 'moment';

import './pasttrips.css';
import { Trip } from '../../interfaces/trip';

type IProps = {
  trips: Trip[];
};

function PastTrips({ trips }: IProps) {
  return (
    <div className="triplist">
      {trips &&
        trips.map((trip: Trip) => {
          return (
            <Card style={{ width: '28%' }}>
              <Card.Img
                className="img-thumbnail"
                variant="top"
                src={trip.picture}
              />
              <Card.Body>
                <Card.Title>{trip.destination}</Card.Title>
                <Card.Text>
                  {moment(trip.fromDate).format('MMM Do YY')} {' – '}
                  {moment(trip.toDate).format('MMM Do YY')}
                </Card.Text>
                <Link to={'/trips/' + trip.id}>
                  <Button variant="primary">See trip</Button>
                </Link>
              </Card.Body>
            </Card>
          );
        })}
    </div>
  );
}

export default PastTrips;
