const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');
// const { createWriteStream, unlink } = require('fs');

const { SECRET_KEY } = require('../../../config');
const {
  validateRegisterInput,
  validateLoginInput,
  validateFriendRequest,
} = require('../../util/validators');
const checkAuth = require('../../util/check-auth');
const User = require('../../models/user');

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

      const userTo = await User.findOne({ username: to });

      const { valid, errors } = validateFriendRequest(user.id, userTo);
      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      await User.findByIdAndUpdate(user.id, {
        $push: { sentFriendRequests: userTo.id },
      });

      await User.findByIdAndUpdate(userTo.id, {
        $push: { receivedFriendRequests: user.id },
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

    async undoFriendRequest(_, { to }, context) {
      const user = checkAuth(context);
      const userTo = await User.findOne({ username: to });

      await User.findByIdAndUpdate(user.id, {
        $pull: { sentFriendRequests: userTo.id },
      });

      await User.findByIdAndUpdate(userTo.id, {
        $pull: { receivedFriendRequests: user.id },
      });

      return 'Successful';
    },

    async deleteFriend(_, { to }, context) {
      const user = checkAuth(context);
      const userTo = await User.findOne({ username: to });

      await User.findByIdAndUpdate(user.id, {
        $pull: { friends: userTo.id },
      });

      await User.findByIdAndUpdate(userTo.id, {
        $pull: { friends: user.id },
      });

      return 'Successful';
    },
    uploadFile: async (_, { file }) => {
      const { createReadStream, filename, mimetype } = await file;
      const stream = createReadStream();
      // const id = shortid.generate();
      const path2 = path.join(__dirname, '../../public/images', filename);
      // const file = { id, filename, mimetype, path };

      try {
        new Promise((resolve, reject) => {
          const writeStream = fs.createWriteStream(path2);

          // writeStream.on('finish', resolve);
          writeStream.on('finish', () => {
            console.log('finish');
            resolve();
          });

          writeStream.on('error', (error) => {
            unlink(path2, () => {
              reject(error);
            });
          });

          writeStream.on('close', (e) => console.log('closed', e));

          stream.on('error', (error) => writeStream.destroy(error));

          stream.pipe(writeStream);
        });
      } catch (error) {
        console.log(error);
      }
      // const { createReadStream, filename, mimetype, encoding } = await file;

      // console.log(filename, mimetype, encoding);
      // new Promise((res, reject) =>
      //   createReadStream()
      //     .pipe(
      //       createWriteStream(
      //         path.join(__dirname, '../../public/images', filename)
      //       )
      //     )
      //     .on('error', (err) => reject(err))
      //     .on('finish', res)
      // );

      // const stream = createReadStream();
      // const pathName = path.join(__dirname, `../../public/images${filename}`);
      // console.log(filename);
      // await stream.pipe(fs.createWriteStream(pathName));
      return {
        url: `http://localhost:4000/images/${filename}`,
      };
    },
  },
};
