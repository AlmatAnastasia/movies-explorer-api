const express = require('express');

const mongoose = require('mongoose');
// защита приложения от некоторых веб-уязвимостей
const helmet = require('helmet');
const { errors } = require('celebrate');
const { PORT, DB_ADDRESS } = require('./utils/config');
const limiter = require('./utils/limiter');
const { cors } = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const router = require('./routes');

mongoose.connect(DB_ADDRESS);

const app = express();
app.use(cors);
app.use(express.json());
app.use(requestLogger); // подключить логгер запросов

app.use(limiter);
app.use(helmet());
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use('/', router);
app.use(errorLogger); // подключить логгер ошибок
router.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log('Сервер запущен по порту 3000');
});
