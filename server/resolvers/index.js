const tripsResolvers = require('./trip');
const usersResolvers = require('./user');

module.exports = {
  Query: {
    ...tripsResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
  },
};
