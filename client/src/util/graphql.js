// import gql from 'graphql-tag';

// const CREATE_TRIP = gql`
//   mutation createTrip(
//     $destination: String!
//     $picture: String!
//     $fromDate: String!
//     $toDate: String!
//     $expenses: String!
//     $toDo: String!
//     $friends: String!
//   ) {
//     register(
//       createTripInput: {
//         destination: $destination
//         picture: $picture
//         fromDate: $fromDate
//         toDate: $toDate
//         expenses: $expenses
//         toDo: $toDo
//         friends: $friends
//       }
//     ) {
//       id
//       destination
//       picture
//       fromDate
//       toDate
//       expenses
//       toDo
//       username {
//         username
//       }
//       friends {
//         id
//         firstname
//         lastname
//         currentCity
//         trips {
//           id
//           destination
//           picture
//           fromDate
//           toDate
//           createdAt
//           username {
//             username
//           }
//           expenses
//           toDo
//           friends {
//             username
//             profilePic
//           }
//         }
//         email
//         username
//         createdAt
//       }
//       createdAt
//     }
//   }
// `;
