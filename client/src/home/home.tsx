import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import SearchLocationInput from '../APIs/googlemaps/searchlocationinput/SearchLocationInput';
import { TripOriginSharp } from '@material-ui/icons';

function Home() {
  // const { loading, data: { getTrips: trips } = {} } = useQuery(
  //   FETCH_TRIPS_QUERY
  // );
  // if (trips) {
  //   console.log(trips);
  // }

  return (
    <div>
      {/* {videos && videos.length ? (
          <video
            src={}
            autoPlay
            loop
            muted
          ></video>
        ) : (
          <h1>loading...</h1>
        )}
        <h1>rest</h1> */}
    </div>
  );
}

// const FETCH_TRIPS_QUERY = gql`
//   {
//     getTrips {
//       id
//       username
//     }
//   }
// `;
export default Home;
