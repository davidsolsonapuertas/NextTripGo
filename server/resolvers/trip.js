const { AuthenticationError } = require('apollo-server');
const { argsToArgsConfig } = require('graphql/type/definition');
const Trip = require('../models/trip');
const User = require('../models/user');
const checkAuth = require('../util/check-auth');
const { UserInputError } = require('apollo-server');

const { validateTripInput } = require('../util/validators');

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
    async getTripsByUsername(_, { userId }) {
      try {
        const user = await User.findById(userId);
        if (user) {
          const res = [];
          for (key in user.trips) {
            trip = await Trip.findById(user.trips[key]);
            res.push(trip);
          }
          return res;
        } else {
          throw new Error('This user does not exist.');
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Trip: {
    async userid(obj) {
      user = await User.findById(obj.userid);
      return user;
    },
  },
  Mutation: {
    async createTrip(
      _,
      {
        createTripInput: {
          destination,
          picture,
          fromDate,
          toDate,
          expenses,
          toDo,
          friends,
        },
      },
      context
    ) {
      const user = checkAuth(context);

      const { valid, errors } = validateTripInput(
        destination,
        fromDate,
        toDate
      );
      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      const newTrip = new Trip({
        destination,
        picture,
        fromDate,
        toDate,
        expenses,
        toDo,
        friends,
        userid: user.id,
        createdAt: new Date().toISOString(),
      });
      const trip = await newTrip.save();

      await User.findByIdAndUpdate(user.id, {
        $addToSet: { trips: newTrip._id },
      });

      context.pubsub.publish('NEW_TRIP', {
        newTrip: trip,
      });

      return trip.populate('user').execPopulate();
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
  Subscription: {
    newTrip: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('NEW_TRIP'),
    },
  },
};
