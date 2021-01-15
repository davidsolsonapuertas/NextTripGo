import { gql } from '@apollo/client';

export const FETCH_USERS = gql`
  query getUsers {
    getUsers {
      username
    }
  }
`;

export const GET_USER_BY_USERNAME = gql`
  query getUser($username: String) {
    getUser(username: $username) {
      id
      firstname
      lastname
      username
      currentCity {
        city
        latitude
        longitude
      }
      profilePic
      friends {
        username
      }
      trips {
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
        friends {
          username
        }
      }
      createdAt
    }
  }
`;

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
