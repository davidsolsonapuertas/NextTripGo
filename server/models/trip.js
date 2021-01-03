const mongoose = require('./index');
const { Schema } = mongoose;

const tripSchema = new Schema({
  destination: String,
  picture: String,
  fromDate: String,
  toDate: String,
  createdAt: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  expenses: String,
  toDo: String,
  friends: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
});

const Trip = mongoose.model('Trip', tripSchema);
module.exports = Trip;
