const bcrypt = require('bcryptjs');
const userModel = require('../models/users');
const { SALT_ROUNDS } = require('../utils/config');
const { STATUS_CODES } = require('../utils/costants');
const { errorMessage } = require('../utils/costants');
const { signToken } = require('../utils/jwtAuth');
const BadRequestError = require('../errors/Bad_Request_Error');
const UnauthorizedError = require('../errors/Unauthorized_Error');
const ConflictingRequestError = require('../errors/Conflicting_Request_Error');
const NotFoundError = require('../errors/Not_Found_Error');

// вернуть информацию о текущем пользователе (email и имя)
const getUserMe = (req, res, next) => {
  const owner = req.user._id;
  userModel
    .findById(owner)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(errorMessage.messageNotFoundErrorUser);
      }
      return res.send(user);
    })
    .catch(next);
};

// обновить информацию о текущем пользователе (email и имя)
// { new: true, runValidators: true } - обновление, валидация
const patchUserMe = (req, res, next) => {
  const owner = req.user._id;
  const { email, name } = req.body;
  userModel
    .findByIdAndUpdate(
      owner,
      { email, name },
      { new: true, runValidators: true },
    )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.code === STATUS_CODES.MONGO_DUPLICATE_KEY_ERROR) {
        next(new ConflictingRequestError(errorMessage.messageConflictingRequestError));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError(errorMessage.messageBadRequestError));
      } else {
        next(err);
      }
    });
};

// регистрация пользователя (создать пользователя)
const postUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;

  bcrypt.hash(password, SALT_ROUNDS)
    .then((hash) => {
      userModel
        .create({
          email, password: hash, name,
        })
        .then(() => {
          res.send({
            data: {
              email, name,
            },
          });
        })
        .catch((err) => {
          if (err.code === STATUS_CODES.MONGO_DUPLICATE_KEY_ERROR) {
            next(new ConflictingRequestError(errorMessage.messageConflictingRequestError));
          } else if (err.name === 'ValidationError') {
            next(new BadRequestError(errorMessage.messageBadRequestError));
          } else {
            next(err);
          }
        });
    })
    .catch(next);
};

// авторизация пользователя (проверить почту и пароль)
const loginUser = (req, res, next) => {
  const { email, password } = req.body;
  userModel
    .findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(errorMessage.messageUnauthorizedErrorLogin);
      }
      return user;
    })
    .then((user) => {
      const match = Promise.all([user, bcrypt.compare(password, user.password)]);
      return match;
    })
    .then(([user, match]) => {
      if (!match) {
        throw new UnauthorizedError(errorMessage.messageUnauthorizedErrorLogin);
      }
      const token = signToken({ _id: user._id });
      res.send({ token });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(errorMessage.messageBadRequestError));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getUserMe,
  patchUserMe,
  postUser,
  loginUser,
};
