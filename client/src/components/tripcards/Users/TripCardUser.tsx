import React from 'react';
import { Card } from 'react-bootstrap';
import moment from 'moment';

import './../tripcards.css';
import { Trip } from '../../../Interfaces/Trip';
import Logo from '../../../assets/logo.png';

interface IProps {
  trip: Trip;
}

function TripCard({ trip }: IProps) {
  return (
    <>
      <div
        key={trip.id}
        className="mx-3 trip-user card shadow shadow-hover mb-4"
      >
        <Card.Img
          className="img-thumbnail mb-1"
          src={trip.picture ? trip.picture : Logo}
        />
        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
          <h6 className="m-0 font-weight-bold text-primary">
            {trip.destination.formattedAddress}
          </h6>
        </div>
        <div className="card-body card-margin">
          {moment(trip.fromDate).format('MMM Do YY')} {' – '}
          {moment(trip.toDate).format('MMM Do YY')}
        </div>
      </div>
    </>
  );
}

export default TripCard;
