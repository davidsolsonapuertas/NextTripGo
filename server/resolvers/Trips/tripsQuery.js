const Trip = require('../../models/trip');
const User = require('../../models/user');

module.exports = {
  Query: {
    async getTrips() {
      try {
        const trips = await Trip.find();
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
          for (let key in user.trips) {
            trip = await Trip.findById(user.trips[key])
              .populate('friends')
              .populate('userid');
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
      const user = await User.findById(obj.userid);
      return user;
    },
    async friends(obj) {
      const res = [];
      for (let key in obj.friends) {
        user = await User.findById(obj.friends[key]);
        res.push(user);
      }
      return res;
    },
  },
};
