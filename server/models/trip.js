const mongoose = require('./index');
const { Schema } = mongoose;

const tripSchema = new Schema({
  destination: String,
  picture: String,
  fromDate: String,
  toDate: String,
  createdAt: String,
  username: String,
});

const Trip = mongoose.model('Trip', tripSchema);
module.exports = Trip;
