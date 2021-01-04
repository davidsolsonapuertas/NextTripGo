const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const {
  validateRegisterInput,
  validateLoginInput,
} = require('../util/validators');
const { SECRET_KEY } = require('../../config');
const User = require('../models/user');

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    SECRET_KEY,
    { expiresIn: '24h' }
  );
}

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
    async getUser(_, { userId }) {
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
  },
  Mutation: {
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password);

      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      const user = await User.findOne({ username });

      if (!user) {
        errors.general = 'User not found';
        throw new UserInputError('User not found', { errors });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = 'Wrong credentials';
        throw new UserInputError('Wrong credentials', { errors });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user.id,
        token,
      };
    },
    async register(
      _,
      {
        registerInput: {
          firstname,
          lastname,
          username,
          currentCity,
          email,
          password,
          confirmPassword,
        },
      }
    ) {
      const { valid, errors } = validateRegisterInput(
        firstname,
        lastname,
        username,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }
      const user = await User.findOne({ username });
      password = await bcrypt.hash(password, 12);
      if (user) {
        throw new UserInputError('Username is taken', {
          errors: {
            username: 'This username is taken',
          },
        });
      }
      const mail = await User.findOne({ email });
      if (mail) {
        throw new UserInputError('Email already linked to an account', {
          errors: {
            username: 'This email has already linked to an account',
          },
        });
      }
      const newUser = new User({
        firstname,
        lastname,
        username,
        currentCity,
        email,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = generateToken(res);

      return {
        ...res._doc,
        id: res.id,
        token,
      };
    },
  },
};
