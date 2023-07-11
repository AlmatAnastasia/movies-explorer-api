const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const allPaths = require('./allPaths');
const {
  postUser, loginUser,
} = require('../controllers/users');
const { validatorSignIn, validatorSignUp } = require('../middlewares/validate');
const auth = require('../middlewares/auth');

// регистрация пользователя
// POST /signup
router.post('/signup', validatorSignUp, postUser);
// авторизация пользователя
// POST /signin
router.post('/signin', validatorSignIn, loginUser);
// авторизация
router.use(auth);
router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.use(allPaths);

module.exports = router;
