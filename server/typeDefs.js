const { gql } = require('apollo-server');

const typeDefs = gql`
  scalar FileUpload

  type Trip {
    id: ID!
    destination: Location!
    picture: String
    fromDate: String
    toDate: String
    createdAt: String!
    userid: User!
    expenses: [Expense]
    toDo: String
    # activities: [DayActivities]
    friends: [User]
  }
  # type DayActivities {
  #   dayactivities: [Activity]
  # }
  # type Activity {
  #   day: String
  #   fromHour: String
  #   toHour: String
  #   activity: String
  #   description: String
  #   price: Float
  #   location: Location
  # }
  type File {
    url: String!
  }
  type Location {
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
    currentCity: Location
    profilePic: String
    friends: [User]
    trips: [Trip]
    sentFriendRequests: [String]
    receivedFriendRequests: [String]
    email: String!
    token: String!
    createdAt: String!
  }
  input RegisterInput {
    firstname: String!
    lastname: String!
    username: String!
    currentCity: LocationInput
    email: String!
    password: String!
    confirmPassword: String!
  }
  input CreateTripInput {
    destination: LocationInput!
    picture: String
    fromDate: String
    toDate: String
    expenses: [ExpenseInput]
    toDo: String
    friends: [String]
  }
  input ExpenseInput {
    type: String
    amount: Float
    currency: String
  }
  input LocationInput {
    formattedAddress: String
    latitude: String
    longitude: String
  }
  type Query {
    getUsers: [User]
    getUser(username: String!): User
    getUserById(userId: String!): User
    getLoggedUser(userId: ID!): User
    getTrips: [Trip]
    getTrip(tripId: ID!): Trip
    getTripsByUsername(userId: ID!): [Trip]
  }
  type Mutation {
    register(registerInput: RegisterInput): User
    login(username: String!, password: String!): User
    uploadFile(file: FileUpload!): File!
    setProfilePicture(file: FileUpload!): File!
    createTrip(createTripInput: CreateTripInput!): Trip
    deleteTrip(tripId: ID!): String
    sendFriendRequest(to: String!): String
    acceptFriendRequest(to: String!): String
    rejectFriendRequest(to: String!): String
    undoFriendRequest(to: String!): String
    deleteFriend(to: String!): String
  }
  type Subscription {
    newTrip: Trip!
  }
`;

module.exports = typeDefs;
