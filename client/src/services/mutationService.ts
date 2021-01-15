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
      email
      token
      username
      createdAt
    }
  }
`;

export const CREATE_TRIP = gql`
  mutation createTrip(
    $destination: DestinationInput!
    $picture: String
    $fromDate: String!
    $toDate: String!
    $expenses: [ExpenseInput]
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
      destination {
        formattedAddress
        latitude
        longitude
      }
      picture
      fromDate
      toDate
      expenses {
        type
        amount
        currency
      }
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
            id
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
      createdAt
    }
  }
`;

export const DELETE_TRIP = gql`
  mutation deleteTrip($tripId: ID!) {
    deleteTrip(tripId: $tripId)
  }
`;

export const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;
