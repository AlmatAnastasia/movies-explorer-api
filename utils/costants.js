const STATUS_CODES = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED_ERROR: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICTING_REQUEST: 409,
  INTERNAL_SERVER_ERROR: 500,
  MONGO_DUPLICATE_KEY_ERROR: 11000,
};

const errorMessage = {
  messageNotFoundErrorMovie: 'Фильм не найден',
  messageForbiddenError: 'Доступ к запрошенному ресурсу запрещен',
  messageBadRequestError: 'Переданы некорректные данные',
  messageNotFoundErrorUser: 'Пользователь не найден',
  messageConflictingRequestError: 'Такой пользователь уже существует',
  messageUnauthorizedErrorLogin: 'Неправильные почта или пароль',
  messageUnauthorizedErrorAuth: 'Требуется авторизация',
  messageNotFoundErrorPath: 'Путь не найден',
  messageInternalServerError: 'Внутренняя ошибка сервера',
};

const regex = /^(http|https):\/\/(www.)?[0-9a-z -._~:[\]/?#[\]@!$&'()*+,;=]{1,}(\/[a-z/]*)?(#)?/i;

module.exports = { STATUS_CODES, regex, errorMessage };
