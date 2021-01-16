const tripsQuery = require('./Trips/tripsQuery');
const tripsMutation = require('./Trips/tripsMutation');
const usersQuery = require('./Users/usersQuery');
const usersMutation = require('./Users/usersMutation');

module.exports = {
  Query: {
    ...usersQuery.Query,
    ...tripsQuery.Query,
  },
  User: {
    ...usersQuery.User,
  },
  Trip: {
    ...tripsQuery.Trip,
  },
  Mutation: {
    ...usersMutation.Mutation,
    ...tripsMutation.Mutation,
  },
  Subscription: {
    ...tripsMutation.Subscription,
  },
};
