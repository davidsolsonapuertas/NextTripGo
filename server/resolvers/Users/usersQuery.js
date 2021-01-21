const checkAuth = require('../../util/check-auth');

const User = require('../../models/user');
const Trip = require('../../models/trip');

module.exports = {
  Query: {
    async getUsers() {
      try {
        const users = await User.find();
        return users;
      } catch (error) {
        throw new Error(error);
      }
    },
    async getUser(_, { username }) {
      try {
        const user = await User.findOne({ username });

        if (user) {
          return user;
        } else {
          throw new Error('User not found');
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async getUserById(_, { userId }) {
      try {
        const user = await User.findById(userId);

        if (user) {
          return user;
        } else {
          throw new Error('User not found');
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async getLoggedUser(_, { userId }, context) {
      try {
        const user = checkAuth(context);
        if (userId !== user.id) {
          throw new Error('Action not allowed');
        }
        const userInfo = await User.findById(userId)
          .populate({
            path: 'trips',
            model: 'Trip',
            populate: {
              path: 'userid',
              model: 'User',
            },
          })
          .populate('friends');
        return userInfo;
      } catch (error) {
        throw new Error(error);
      }
    },
  },

  User: {
    async trips(obj) {
      const res = [];
      for (let key in obj.trips) {
        trip = await Trip.findById(obj.trips[key]);
        res.push(trip);
      }
      return res;
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
