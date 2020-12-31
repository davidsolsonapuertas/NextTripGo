const mongoose = require('./index');
const { Schema } = mongoose;

const userSchema = new Schema({
  firstname: String,
  lastname: String,
  username: String,
  currentCity: String,
  email: String,
  password: String,
  confirmPassword: String,
  createdAt: String,
});

const User = mongoose.model('User', userSchema);
module.exports = User;
