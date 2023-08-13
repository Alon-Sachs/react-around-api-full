const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');

module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequestError('Validation Error'));
      } else {
        next(error);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.isSelfCard(res.user._id, cardId)
    .then((res) => {
      return Card.findByIdAndDelete(cardId)
    })
    .orFail(() => {
      throw new NotFoundError('There is no card with the requested id');
    })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.isSelfCard(res.user._id, cardId)
    .then((res) => {
      Card.findByIdAndUpdate(
        cardId,
        { $addToSet: { likes: req.user._id } },
        { new: true },
      )
    })
    .orFail(() => {
      throw new NotFoundError('There is no card with the requested id');
    })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.isSelfCard(res.user._id, cardId)
    .then((res) => {
      Card.findByIdAndUpdate(
        cardId,
        { $pull: { likes: req.user._id } },
        { new: true },
      )
    })
    .orFail(() => {
      throw new NotFoundError('There is no card with the requested id');
    })
    .then((card) => res.send({ data: card }))
    .catch(next);
}
