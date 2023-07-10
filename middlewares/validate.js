const { celebrate, Joi } = require('celebrate');
// регулярное выражение для проверки ссылки
const { regex } = require('../utils/costants');

// регистрация пользователя
const validatorSignUp = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }),
});

// авторизация пользователя
const validatorSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

// обновить информацию о текущем пользователе (email и имя)
const validatorPatchUserMe = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().min(2).max(30),
  }),
});

// удалить сохранённый фильм по id
const validatorMovieByID = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
});

// создать фильм
const validatorPostMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(regex),
    trailerLink: Joi.string().required().pattern(regex),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().pattern(regex),
    movieId: Joi.number().required(),
  }),
});

module.exports = {
  validatorSignIn,
  validatorSignUp,
  validatorPatchUserMe,
  validatorMovieByID,
  validatorPostMovie,
};
