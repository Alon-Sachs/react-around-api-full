const cards = require('express').Router();
const {
  getAllCards, deleteCard, createCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const validator = require('validator');
const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
}

const { celebrate, Joi } = require('celebrate');

cards.get('/', getAllCards);

cards.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().custom(validateURL),
  }),
}), createCard);

cards.delete('/:cardId', celebrate({
  query: Joi.object().keys({
    cardId: Joi.string().required().alphanum()
  }),
}), deleteCard);

cards.put('/:cardId/likes', celebrate({
  query: Joi.object().keys({
    cardId: Joi.string().required().alphanum()
  }),
}), likeCard);

cards.delete('/:cardId/likes', celebrate({
  query: Joi.object().keys({
    cardId: Joi.string().required().alphanum()
  }),
}), dislikeCard);

module.exports = cards;
