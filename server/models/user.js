const mongoose = require('./index');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  createdAt: String,
  trips: Object,
});

const User = mongoose.model('User', userSchema);
module.exports = User;
