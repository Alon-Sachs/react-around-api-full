const users = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const {
  getUser, updateUserProfile, updateUserAvatar, getSelf,
} = require('../controllers/users');

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

users.get('/me', getSelf);

users.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUserProfile);

users.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validateURL),
  }),
}), updateUserAvatar);

users.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().alphanum(),
  }),
}), getUser);

module.exports = users;
