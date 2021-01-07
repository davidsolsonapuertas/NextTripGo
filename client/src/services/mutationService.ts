import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation register(
    $firstname: String!
    $lastname: String!
    $username: String!
    $currentCity: String
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        firstname: $firstname
        lastname: $lastname
        username: $username
        currentCity: $currentCity
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      firstname
      lastname
      currentCity
      email
      username
      createdAt
      token
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      firstname
      lastname
      currentCity
      profilePic
      friends {
        id
        firstname
        lastname
        currentCity
        trips {
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
            profilePic
          }
        }
        email
        username
        createdAt
      }
      trips {
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
          profilePic
        }
      }
      email
      token
      username
      createdAt
    }
  }
`;

export const CREATE_TRIP = gql`
  mutation createTrip(
    $destination: String!
    $picture: String
    $fromDate: String!
    $toDate: String!
    $expenses: String
    $toDo: String
    $friends: String
  ) {
    createTrip(
      createTripInput: {
        destination: $destination
        picture: $picture
        fromDate: $fromDate
        toDate: $toDate
        expenses: $expenses
        toDo: $toDo
        friends: $friends
      }
    ) {
      id
      destination
      picture
      fromDate
      toDate
      expenses
      toDo
      userid {
        id
      }
      friends {
        id
        firstname
        lastname
        currentCity
        trips {
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
            username
            profilePic
          }
        }
        email
        username
        createdAt
      }
      createdAt
    }
  }
`;
