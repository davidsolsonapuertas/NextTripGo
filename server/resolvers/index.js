const tripsResolvers = require('./trip');
const usersResolvers = require('./user');

module.exports = {
  Query: {
    ...usersResolvers.Query,
    ...tripsResolvers.Query,
  },
  User: {
    ...usersResolvers.User,
  },
  Trip: {
    ...tripsResolvers.Trip,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...tripsResolvers.Mutation,
  },
  Subscription: {
    ...tripsResolvers.Subscription,
  },
};
