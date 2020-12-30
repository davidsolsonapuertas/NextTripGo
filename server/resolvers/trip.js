const { AuthenticationError } = require('apollo-server');
const { argsToArgsConfig } = require('graphql/type/definition');
const Trip = require('../models/trip');
const checkAuth = require('../util/check-auth');

module.exports = {
  Query: {
    async getTrips() {
      try {
        const trips = await Trip.find().sort({ createdAt: -1 });
        return trips;
      } catch (error) {
        throw new Error(error);
      }
    },
    async getTrip(_, { tripId }) {
      try {
        const trip = await Trip.findById(tripId);
        if (trip) {
          return trip;
        } else {
          throw new Error('Trip not found');
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    async createTrip(_, { destination }, context) {
      const user = checkAuth(context);

      if (args.body.trim() === '') {
        throw new Error('Destination must not be empty');
      }
      const newTrip = new Trip({
        destination,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });

      const trip = await newTrip.save();
      console.log(trip);

      return trip;
    },
    async deleteTrip(_, { tripId }, context) {
      const user = checkAuth(context);

      try {
        const trip = await Trip.findById(tripId);
        if (user.username === trip.username) {
          await trip.delete();
          return 'Trip deleted successfully';
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
