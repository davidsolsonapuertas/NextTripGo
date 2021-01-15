const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');
const path = require('path');
const fs = require('fs');

const checkAuth = require('../util/check-auth');
const {
  validateRegisterInput,
  validateLoginInput,
  validateFriendRequest,
} = require('../util/validators');
const { SECRET_KEY } = require('../../config');
const User = require('../models/user');
const Trip = require('../models/trip');

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

    uploads: (parent, args) => {},
  },

  User: {
    async trips(obj) {
      const res = [];
      for (key in obj.trips) {
        trip = await Trip.findById(obj.trips[key]);
        res.push(trip);
      }
      return res;
    },

    async friends(obj) {
      const res = [];
      for (key in obj.friends) {
        user = await User.findById(obj.friends[key]);
        res.push(user);
      }
      return res;
    },

    async sentFriendRequests(obj) {
      const res = [];
      for (key in obj.sentFriendRequests) {
        user = await User.findById(obj.sentFriendRequests[key]);
        res.push(user);
      }
      return res;
    },

    async receivedFriendRequests(obj) {
      const res = [];
      for (key in obj.receivedFriendRequests) {
        user = await User.findById(obj.receivedFriendRequests[key]);
        res.push(user);
      }
      return res;
    },
  },

  Mutation: {
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password);

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

    async sendFriendRequest(_, { to }, context) {
      const user = checkAuth(context);

      userFrom = await User.findById(user.id);
      const userTo = await User.findOne({ username: to });

      const { valid, errors } = validateFriendRequest(user.id, userTo);
      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      await User.findByIdAndUpdate(user.id, {
        $addToSet: { sentFriendRequests: userTo.id },
      });

      await User.findByIdAndUpdate(userTo.id, {
        $addToSet: { receivedFriendRequests: user.id },
      });

      return 'Successful';
    },

    async acceptFriendRequest(_, { to }, context) {
      const user = checkAuth(context);
      const userTo = await User.findOne({ username: to });

      await User.findByIdAndUpdate(user.id, {
        $pull: { receivedFriendRequests: userTo.id },
        $addToSet: { friends: userTo.id },
      });

      await User.findByIdAndUpdate(userTo.id, {
        $pull: { sentFriendRequests: user.id },
        $addToSet: { friends: user.id },
      });

      return 'Successful';
    },

    async rejectFriendRequest(_, { to }, context) {
      const user = checkAuth(context);
      const userTo = await User.findOne({ username: to });

      await User.findByIdAndUpdate(user.id, {
        $pull: { receivedFriendRequests: userTo.id },
      });

      await User.findByIdAndUpdate(userTo.id, {
        $pull: { sentFriendRequests: user.id },
      });

      return 'Successful';
    },

    uploadFile: async (parent, args) => {
      return args.file.then((file) => {
        const { createReadStream, filename, mimetype } = file;

        const fileStream = createReadStream();

        fileStream.pipe(
          fs.createWriteStream(
            path.join(__dirname, `../public/images/${filename}`)
          )
        );

        return {
          url: `http://localhost:4000/images/${filename}`,
        };
      });
    },
  },
};
