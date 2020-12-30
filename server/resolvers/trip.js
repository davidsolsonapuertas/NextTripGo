const Trip = require('../models/trip');

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
  },
};
