const { gql } = require('apollo-server');

const typeDefs = gql`
  type Trip {
    id: ID!
    destination: Destination!
    picture: String
    fromDate: String
    toDate: String
    createdAt: String!
    userid: User!
    expenses: [Expense]
    toDo: String
    friends: [User]
  }
  type Destination {
    formattedAddress: String
    latitude: String
    longitude: String
  }
  type Expense {
    type: String
    amount: Float
    currency: String
  }
  type User {
    id: ID!
    firstname: String!
    lastname: String!
    username: String!
    currentCity: String
    profilePic: String
    friends: [User]
    trips: [Trip]
    email: String!
    token: String!
    createdAt: String!
  }
  input RegisterInput {
    firstname: String!
    lastname: String!
    username: String!
    currentCity: String
    email: String!
    password: String!
    confirmPassword: String!
  }
  input CreateTripInput {
    destination: DestinationInput!
    picture: String
    fromDate: String
    toDate: String
    expenses: [ExpenseInput]
    toDo: String
    friends: String
  }
  input ExpenseInput {
    type: String
    amount: Float
    currency: String
  }
  input DestinationInput {
    formattedAddress: String
    latitude: String
    longitude: String
  }
  type Query {
    getUsers: [User]
    getUser(userId: ID!): User
    getTrips: [Trip]
    getTrip(tripId: ID!): Trip
    getTripsByUsername(userId: ID!): [Trip]
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createTrip(createTripInput: CreateTripInput!): Trip!
    deleteTrip(tripId: ID!): String!
  }
  type Subscription {
    newTrip: Trip!
  }
`;

module.exports = typeDefs;
