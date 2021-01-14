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
    ref: 'users',
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
  toDo: String,
  friends: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
});

const Trip = mongoose.model('Trip', tripSchema);
module.exports = Trip;
