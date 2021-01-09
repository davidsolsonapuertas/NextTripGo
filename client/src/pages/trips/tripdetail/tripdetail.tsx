import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  useParams,
  Redirect,
  useHistory,
} from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_TRIP_BY_ID } from '../../../services/queryService';
import { Trip } from '../../../interfaces/trip';

interface ParamTypes {
  id: string;
}

function TripDetail() {
  let { id } = useParams<ParamTypes>();

  let { loading, error, data } = useQuery(GET_TRIP_BY_ID, {
    variables: { tripId: id },
    pollInterval: 500,
  });
  console.log(data);

  let trip = data?.getTrip;
  console.log(id);

  let postMarkup;
  if (!trip) {
    postMarkup = <p>Loading trip...</p>;
  } else {
    const { id, destination } = trip;

    postMarkup = <div>{destination}</div>;
  }

  return postMarkup;
}

export default TripDetail;
