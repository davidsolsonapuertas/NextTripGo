import React from 'react';
import { Trip } from '../../Interfaces/Trip';

import TripCard from './TripCard';

type IProps = {
  trips: Trip[];
  time: String;
};

function TripCards({ trips, time }: IProps) {
  if (typeof trips !== 'undefined') {
    trips = trips
      .filter((trip) => {
        if (time === 'past') {
          return trip.fromDate < new Date().toISOString();
        } else {
          return trip.fromDate > new Date().toISOString();
        }
      })
      .sort((a, b) => (a.fromDate > b.fromDate ? 1 : -1));
  }
  return (
    <div className="d-flex mt-4 justify-content-center flex-wrap">
      {trips &&
        trips.map((trip: Trip, index: Number) => {
          return <TripCard key={index} trip={trip} />;
        })}
    </div>
  );
}

export default TripCards;
