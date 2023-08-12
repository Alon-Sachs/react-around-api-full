require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const process = require('process');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cards = require('./routes/cards');
const users = require('./routes/users');
const auth = require('./middlewares/auth');
const { errors } = require('celebrate');
const errorHandler = require('./middlewares/errorHandler');
const { NOT_FOUND } = require('./utils/constants');
const { createUser } = require('./controllers/users');
const { login } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const cors = require('cors');

const validateEmail = (value, helpers) => {
  if (validator.isEmail(value)) {
    return value;
  }
  return helpers.error('string.email');
}


process.on('uncaughtException', (err, origin) => {
  console.log(`${origin} ${err.name} with the message ${err.message} was not handled. Pay attention to it!`);
});

const app = express();

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/aroundb');

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(cors());
app.options('*', cors());

app.use(limiter);
app.use(helmet());
app.use(express.json());
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});


app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().min(2).max(30).custom(validateEmail),
    password: Joi.string().min(2).max(30),}),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().min(2).max(30),
    password: Joi.string().min(2).max(30).custom(validateEmail),
  }),
}), createUser);

app.use(auth);

app.use('/cards', cards);
app.use('/users', users);

app.use((req, res) => {
  res.status(NOT_FOUND).send({ message: 'Requested resource not found' });
});

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
