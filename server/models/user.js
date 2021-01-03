const mongoose = require('./index');
const { Schema } = mongoose;

const userSchema = new Schema({
  firstname: String,
  lastname: String,
  username: String,
  currentCity: String,
  profilePic: String,
  friends: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  trips: {
    type: Schema.Types.ObjectId,
    ref: 'trips',
  },
  email: String,
  password: String,
  createdAt: String,
});

const User = mongoose.model('User', userSchema);
module.exports = User;
