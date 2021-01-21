import { gql } from '@apollo/client';

export const FETCH_USERS = gql`
  query getUsers {
    getUsers {
      username
    }
  }
`;

export const GET_LOGGED_USER = gql`
  query getLoggedUser($userId: ID!) {
    getLoggedUser(userId: $userId) {
      id
      firstname
      lastname
      currentCity {
        formattedAddress
        latitude
        longitude
      }
      profilePic
      friends {
        id
        firstname
        lastname
        currentCity {
          formattedAddress
          latitude
          longitude
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
            profilePic
          }
        }
        email
        username
        createdAt
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
          profilePic
        }
      }
      sentFriendRequests
      receivedFriendRequests
      email
      username
      createdAt
    }
  }
`;

export const GET_USER_BY_USERNAME = gql`
  query getUser($username: String!) {
    getUser(username: $username) {
      id
      firstname
      lastname
      username
      currentCity {
        formattedAddress
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

export const GET_USER_BY_ID = gql`
  query getUserById($userId: String!) {
    getUserById(userId: $userId) {
      id
      firstname
      lastname
      username
      currentCity {
        formattedAddress
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
