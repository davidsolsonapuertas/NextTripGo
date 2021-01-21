import { gql } from '@apollo/client';

export const GET_TRIP_BY_ID = gql`
  query getTrip($tripId: ID!) {
    getTrip(tripId: $tripId) {
      id
      destination {
        formattedAddress
        latitude
        longitude
      }
      picture
      fromDate
      toDate
      createdAt
      userid {
        username
      }
      expenses {
        type
        amount
        currency
      }
      toDo
      friends {
        id
        username
        profilePic
      }
    }
  }
`;

export const FETCH_TRIPS_BY_USERNAME = gql`
  query getTripsByUsername($userId: ID!) {
    getTripsByUsername(userId: $userId) {
      id
      destination {
        formattedAddress
        latitude
        longitude
      }
      picture
      fromDate
      toDate
      createdAt
      userid {
        username
      }
      expenses {
        type
        amount
        currency
      }
      toDo
      friends {
        username
      }
    }
  }
`;
