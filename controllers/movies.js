const movieModel = require('../models/movies');
const { errorMessage } = require('../utils/costants');
const BadRequestError = require('../errors/Bad_Request_Error');
const ForbiddenError = require('../errors/Forbidden_Error');
const NotFoundError = require('../errors/Not_Found_Error');

// вернуть сохранённые текущим пользователем фильмы
const getMovies = (req, res, next) => {
  const ownerId = req.user._id;
  movieModel
    .find({ owner: ownerId })
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

// удалить сохранённый фильм по id
const deleteMovieByID = (req, res, next) => {
  const ownerId = req.user._id;
  const id = req.params.movieId;
  movieModel
    .findById(id)
    .orFail(() => {
      throw new NotFoundError(errorMessage.messageNotFoundErrorMovie);
    })
    .then((movie) => {
      const ownermovie = movie.owner.toString();
      if (ownermovie !== ownerId) {
        throw new ForbiddenError(errorMessage.messageForbiddenError);
      }
      movieModel.findByIdAndRemove(req.params.movieId).then(() => res.send(movie));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(errorMessage.messageBadRequestError));
      } else {
        next(err);
      }
    });
};

// создать фильм
const postMovie = (req, res, next) => {
  const ownerId = req.user._id;
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
      owner: ownerId,
    })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(errorMessage.messageBadRequestError));
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
