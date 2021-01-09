import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { Trip } from '../../interfaces/trip';

type IProps = {
  trips: Trip[];
};

function PastTrips({ trips }: IProps) {
  if (typeof trips !== undefined) {
    trips = trips.filter((trip) => {
      return trip.fromDate > new Date().toISOString();
    });
  }

  return (
    <div className="triplist">
      {trips &&
        trips.map((trip: Trip) => {
          return (
            <Card key={trip.id} style={{ width: '28%' }}>
              <Link to={'/trips/' + trip.id}>
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
                  <Button variant="primary">See trip</Button>
                </Card.Body>
              </Link>
            </Card>
          );
        })}
    </div>
  );
}

export default PastTrips;
