const mongoose = require('./index');

const { Schema } = mongoose;

const tripSchema = new Schema({
  destination: {
    formattedAddress: String,
    latitude: String,
    longitude: String,
  },
  picture: String,
  fromDate: String,
  toDate: String,
  createdAt: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  expenses: [
    {
      type: {
        type: String,
      },
      amount: Number,
      currency: String,
    },
  ],
  activities: [
    [
      {
        day: String,
        fromHour: String,
        toHour: String,
        activity: String,
        description: String,
        price: Number,
        location: {
          formattedAddress: String,
          latitude: String,
          longitude: String,
        },
      },
    ],
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

const Trip = mongoose.model('Trip', tripSchema);
module.exports = Trip;
