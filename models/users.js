const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
// создать схему userSchema
const userSchema = new mongoose.Schema({
  // поля схемы пользователя:
  // почта пользователя (email), хеш пароля (password), имя пользователя (name)
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => isEmail(email),
      message: 'Недопустимый email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Анастасия',
  },
});
// создать модель user и экспортировать её
module.exports = mongoose.model('user', userSchema);
