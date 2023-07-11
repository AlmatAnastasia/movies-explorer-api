const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');
// создать схему movieSchema
const movieSchema = new mongoose.Schema({
  // поля схемы фильма:
  // страна создания фильма (country), режиссёр фильма (director), длительность фильма (duration),
  // год выпуска фильма (year), описание фильма (description), ссылка на постер к фильму (image),
  // ссылка на трейлер фильма (trailerLink), миниатюрное изображение постера к фильму (thumbnail),
  // _id пользователя (owner), id фильма (movieId),
  // название фильма на русском языке (nameRU), название фильма на английском языке (nameEN)
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (url) => isURL(url),
      message: 'Недопустимый URL-адрес',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (url) => isURL(url),
      message: 'Недопустимый URL-адрес',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (url) => isURL(url),
      message: 'Недопустимый URL-адрес',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'movie',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});
// создать модель movie и экспортировать её
module.exports = mongoose.model('movie', movieSchema);
