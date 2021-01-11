import { gql } from '@apollo/client';

export const GET_TRIP_BY_ID = gql`
  query getTrip($tripId: ID!) {
    getTrip(tripId: $tripId) {
      id
      destination
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

export const FETCH_TRIPS_QUERY = gql`
  {
    getTrips {
      id
      destination
      picture
      fromDate
      toDate
      createdAt
      userid {
        id
      }
      expenses {
        type
        amount
        currency
      }
      toDo
      friends {
        id
      }
    }
  }
`;

export const FETCH_TRIPS_BY_USERNAME = gql`
  query getTripsByUsername($userId: ID!) {
    getTripsByUsername(userId: $userId) {
      id
      destination
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
