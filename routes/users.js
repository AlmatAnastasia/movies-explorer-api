const router = require('express').Router();
const {
  getUserMe,
  patchUserMe,
} = require('../controllers/users');
const { validatorPatchUserMe } = require('../middlewares/validate');

// вернуть информацию о текущем пользователе (email и имя)
// GET /users/me
router.get('/me', getUserMe);
// обновить информацию о текущем пользователе (email и имя)
// PATCH /users/me
router.patch('/me', validatorPatchUserMe, patchUserMe);

module.exports = router;
