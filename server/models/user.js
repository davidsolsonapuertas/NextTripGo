const mongoose = require('./index');
const { Schema } = mongoose;

const userSchema = new Schema({
  firstname: String,
  lastname: String,
  username: String,
  currentCity: {
    formattedAddress: String,
    latitude: String,
    longitude: String,
  },
  profilePic: String,
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  trips: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Trip',
    },
  ],
  sentFriendRequests: [String],
  receivedFriendRequests: [String],
  email: String,
  password: String,
  createdAt: String,
});

const User = mongoose.model('User', userSchema);
module.exports = User;
