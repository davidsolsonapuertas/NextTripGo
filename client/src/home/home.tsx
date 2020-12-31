import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import SearchLocationInput from '../trips/newtrip/searchlocationinput/SearchLocationInput';
import { TripOriginSharp } from '@material-ui/icons';

function Home() {
  const { loading, data: { getTrips: trips } = {} } = useQuery(
    FETCH_TRIPS_QUERY
  );
  if (trips) {
    console.log(trips);
  }

  return (
    <div>
      {loading ? (
        <h1>Loading trips...</h1>
      ) : (
        trips && trips.map((trip: any) => trip.username)
      )}
    </div>
  );
}

const FETCH_TRIPS_QUERY = gql`
  {
    getTrips {
      id
      username
    }
  }
`;
export default Home;
