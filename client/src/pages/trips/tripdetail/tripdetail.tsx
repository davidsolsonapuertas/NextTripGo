import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  useParams,
  Redirect,
  useHistory,
} from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { GET_TRIP_BY_ID } from '../../../services/queryService';
import { Trip } from '../../../interfaces/trip';

interface ParamTypes {
  id: string;
}

interface TripData {
  getTrip: Trip;
}

function TripDetail() {
  let { id } = useParams<ParamTypes>();

  const { loading, data } = useQuery<TripData>(GET_TRIP_BY_ID, {
    variables: { tripId: id },
  });

  const trip = data?.getTrip;

  return trip ? (
    <div>{<h1>{trip?.id}</h1>}</div>
  ) : (
    <div>
      {/* TODO Spinner */}
      Loading...
    </div>
  );
}

export default TripDetail;
