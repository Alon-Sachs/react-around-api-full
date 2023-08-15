const users = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUser, updateUserProfile, updateUserAvatar, getSelf,
} = require('../controllers/users');
const validateUrl = require('../utils/urlValidator');

users.get('/me', getSelf);

users.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUserProfile);

users.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validateUrl),
  }),
}), updateUserAvatar);

users.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().alphanum().length(24),
  }),
}), getUser);

module.exports = users;
