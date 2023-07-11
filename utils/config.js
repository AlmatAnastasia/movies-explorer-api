require('dotenv').config();

const { PORT = 3000, DB_ADDRESS = 'mongodb://127.0.0.1/bitfilmsdb' } = process.env;
const { NODE_ENV = 'production', JWT_SECRET = 'JWT_SECRET' } = process.env;
const { SALT_ROUNDS = 10 } = process.env;

module.exports = {
  PORT,
  DB_ADDRESS,
  NODE_ENV,
  JWT_SECRET,
  SALT_ROUNDS,
};
