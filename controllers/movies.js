const movieModel = require('../models/movies');
const BadRequestError = require('../errors/Bad_Request_Error');
const ForbiddenError = require('../errors/Forbidden_Error');
const NotFoundError = require('../errors/Not_Found_Error');

// вернуть сохранённые текущим пользователем фильмы
const getMovies = (req, res, next) => {
  movieModel
    .find({})
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

// удалить сохранённый фильм по id
const deleteMovieByID = (req, res, next) => {
  const owner = req.user._id;
  const id = req.params.movieId;
  movieModel
    .findById(id)
    .orFail(() => {
      throw new NotFoundError('Фильм не найден');
    })
    .then((movie) => {
      const ownermovie = movie.owner.toString();
      if (ownermovie !== owner) {
        throw new ForbiddenError('Нельзя удалить чужой фильм');
      }
      movieModel.findByIdAndRemove(req.params.movieId).then(() => res.send(movie));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

// создать фильм
const postMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;
  movieModel
    .create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner,
    })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovies,
  deleteMovieByID,
  postMovie,
};
