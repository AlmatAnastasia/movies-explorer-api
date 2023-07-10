const UnauthorizedError = require('../errors/Unauthorized_Error');
const { checkToken } = require('../utils/jwtAuth');
const { errorMessage } = require('../utils/costants');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new UnauthorizedError(errorMessage.messageUnauthorizedErrorAuth);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = checkToken(token);
  } catch (err) {
    next(new UnauthorizedError(errorMessage.messageUnauthorizedErrorAuth));
  }
  req.user = payload;
  next();
};

module.exports = auth;
