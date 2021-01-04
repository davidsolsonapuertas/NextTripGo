const tripsResolvers = require('./trip');
const usersResolvers = require('./user');

module.exports = {
  Query: {
    ...tripsResolvers.Query,
  },
  Trip: {
    ...tripsResolvers.Trip,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...tripsResolvers.Mutation,
  },
};
