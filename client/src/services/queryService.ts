import gql from 'graphql-tag';

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
      expenses
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
      expenses
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
      expenses
      toDo
      friends {
        username
      }
    }
  }
`;
