const NotFoundError = require('../errors/Not_Found_Error');
const errorMessage = require('../utils/costants');

// обработать неправильные пути
const getNotFound = () => {
  throw new NotFoundError(errorMessage.messageNotFoundErrorPath);
};

module.exports = { getNotFound };
