import { gql } from '@apollo/client';

export const CREATE_TRIP = gql`
  mutation createTrip(
    $destination: LocationInput!
    $picture: String
    $fromDate: String!
    $toDate: String!
    $expenses: [ExpenseInput]
    $toDo: String
    $friends: [String]
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
