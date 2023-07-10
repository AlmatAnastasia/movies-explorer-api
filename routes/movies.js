const router = require('express').Router();
const {
  getMovies,
  deleteMovieByID,
  postMovie,
} = require('../controllers/movies');
const {
  validatorMovieByID,
  validatorPostMovie,
} = require('../middlewares/validate');
// вернуть все сохранённые текущим пользователем фильмы
// GET /movies
router.get('', getMovies);
// удалить сохранённый фильм по id
// DELETE /movies/_id
router.delete('/:movieId', validatorMovieByID, deleteMovieByID);
// создать фильм
// POST /movies
router.post('', validatorPostMovie, postMovie);

module.exports = router;
