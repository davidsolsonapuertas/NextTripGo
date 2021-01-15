import React from 'react';

import { Trip } from '../../Interfaces/Trip';
import TripCardMy from './MyTripCards/TripCardMy';
import TripCardUser from './Users/TripCardUser';

type IProps = {
  trips: Trip[];
  time: String;
  mode: String;
};

function TripCards({ trips, time, mode }: IProps) {
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
        trips.map((trip: Trip, index: number) => {
          if (mode === 'My') {
            return <TripCardMy key={index} trip={trip} />;
          } else if (mode === 'Users') {
            return <TripCardUser key={index} trip={trip} />;
          }
        })}
    </div>
  );
}

export default TripCards;
