const { gql } = require('apollo-server');

const typeDefs = gql`
  type Trip {
    id: ID!
    destination: String!
    picture: String
    fromDate: String
    toDate: String
    createdAt: String!
    userid: User!
    expenses: String
    toDo: String
    friends: [User]
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
    destination: String!
    picture: String
    fromDate: String
    toDate: String
    expenses: String
    toDo: String
    friends: String
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
