/* eslint-disable no-param-reassign */
var mongoose = require('mongoose');
const { AuthenticationError } = require('apollo-server');
const Trip = require('../../models/trip');
const User = require('../../models/user');
const checkAuth = require('../../util/check-auth');
const { UserInputError } = require('apollo-server');
const { validateTripInput } = require('../../util/validators');

module.exports = {
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

      await Promise.all(
        friends.map(async (friendUsername, index, arr) => {
          const friend = await User.findOne({ username: friendUsername });
          arr[index] = friend._id;
        })
      );

      const { valid, errors } = validateTripInput(
        destination,
        fromDate,
        toDate,
        expenses
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

      return trip;
    },
    async deleteTrip(_, { tripId }, context) {
      const user = checkAuth(context);

      try {
        const trip = await Trip.findById(tripId);
        const tripUser = await User.findById(trip.userid);

        if (user.username === tripUser.username) {
          await User.findByIdAndUpdate(user.id, {
            $pull: { trips: tripId },
          });
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
