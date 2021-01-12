import React from 'react';
import { useParams } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { GET_TRIP_BY_ID } from '../../../services/queryService';
import { Trip } from '../../../Interfaces/Trip';
import SeeExpenses from '../../../Components/Expenses/SeeExpenses';

interface IProps {
  id: string;
}

function TripDetail() {
  let { id } = useParams<IProps>();

  let { loading, error, data } = useQuery(GET_TRIP_BY_ID, {
    variables: { tripId: id },
  });

  let trip = data?.getTrip;
  console.log(id);

  let postMarkup;
  if (!trip) {
    postMarkup = <p>Loading trip...</p>;
  } else {
    postMarkup = (
      <div>
        {trip.destination}
        <h1>Expenses</h1>
        <SeeExpenses expenses={trip.expenses} />
      </div>
    );
  }

  return postMarkup;
}

export default TripDetail;
