const router = require('express').Router();
const {
  getUserMe,
  patchUserMe,
} = require('../controllers/users');
const {
  validatorUserByID,
  validatorPatchUserMe,
} = require('../middlewares/validate');

// вернуть информацию о текущем пользователе (email и имя)
// GET /users/me
router.get('/me', validatorUserByID, getUserMe);
// обновить информацию о текущем пользователе (email и имя)
// PATCH /users/me
router.patch('/me', validatorPatchUserMe, patchUserMe);

module.exports = router;
