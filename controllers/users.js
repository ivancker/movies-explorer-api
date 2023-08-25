const bcrypt = require('bcryptjs');

const userModel = require('../models/users');
const { signToken } = require('../utils/jwtAuth');

const MONGO_DUPLICATE_KEY_ERROR = 11000;
const SALT_ROUNDS = 10;

const NotFoundError = require('../errors/notFoundError'); // 404
const BadRequestError = require('../errors/badRequestError'); // 400
const ConflictError = require('../errors/conflictError'); // 409
const UnauthorizedError = require('../errors/unauthorizedError'); // 401

const createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;
  bcrypt
    .hash(password, SALT_ROUNDS)
    .then((hash) => {
      userModel
        .create({
          name,
          email,
          password: hash,
        })
        .then(() => {
          res.status(201).send({
            name,
            email,
          });
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new NotFoundError('Некорректные данные при создании пользователя'));
          }
          if (err.code === MONGO_DUPLICATE_KEY_ERROR) next(new ConflictError('Пользователь уже существует'));
          else next(err);
        });
    })
    .catch(next);
};

const loginUser = (req, res, next) => {
  const { email, password } = req.body;
  userModel
    .findOne({ email })
    .select('+password')
    .orFail(() => {
      throw new UnauthorizedError('UnautorizedError');
    })
    .then((user) => Promise.all([user, bcrypt.compare(password, user.password)]))
    .then(([user, isEqual]) => {
      if (!isEqual) {
        throw new UnauthorizedError('Пользователь или пароль неверный');
      }

      const token = signToken({ _id: user._id });

      res.status(200).send({ token });
    })
    .catch((err) => {
      if (err.message === 'UnautorizedError') {
        next(new UnauthorizedError('Пользователь или пароль неверный'));
      } next(err);
    });
};

const getUserInfo = (req, res, next) => {
  userModel
    .findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.send(user);
    })
    .catch((err) => next(err));
};

const updateUserInfo = (req, res, next) => {
  const newUserData = req.body;
  userModel
    .findByIdAndUpdate(req.user._id, newUserData, {
      new: true,
      runValidators: true,
      upsert: false,
    })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.code === MONGO_DUPLICATE_KEY_ERROR) next(new ConflictError('Пользователь c таким адресом электронной почты уже существует'));
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при обновлении профиля'));
      } else next(err);
    });
};

module.exports = {
  createUser,
  loginUser,
  getUserInfo,
  updateUserInfo,
};
