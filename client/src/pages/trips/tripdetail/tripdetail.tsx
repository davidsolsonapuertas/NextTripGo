import React from 'react';
import { useParams } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { GET_TRIP_BY_ID } from '../../../services/queryService';
import SeeExpenses from '../../../Components/Expenses/SeeExpenses';
import PieChart from '../../../Components/Expenses/PieChart';
import MapCoordinates from '../../../APIs/googlemaps/MapCoordinates.js';

interface IProps {
  id: string;
}

function TripDetail() {
  let { id } = useParams<IProps>();

  let { data } = useQuery(GET_TRIP_BY_ID, {
    variables: { tripId: id },
  });

  let trip = data?.getTrip;
  console.log(trip);

  let postMarkup;
  if (!trip) {
    //TODO spinner
    postMarkup = <p>Loading trip...</p>;
  } else {
    postMarkup = (
      <div>
        <h1>{trip.destination}</h1>
        <MapCoordinates placeName="Barcelona" />
        {trip.expenses.length > 0 && <SeeExpenses expenses={trip.expenses} />}
      </div>
    );
  }

  return postMarkup;
}

export default TripDetail;
