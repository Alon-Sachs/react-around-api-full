const mongoose = require('mongoose');
const OtherUserError = require('../errors/other-user-error');
const NotFoundError = require('../errors/not-found-error');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /https?:\/\/(w{3}\.)?.+\..+(\/.*)?/gm.test(v),
      message: 'Link validation failed',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    default: [],
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

cardSchema.statics.isSelfCard = function isSelfCard(userId, cardId) {
  return this.findOne({ _id: cardId })
    .then((card) => {
      if (!card) {
        return Promise.reject(new NotFoundError('There is no card with the requested id'));
      }
      if (card.owner.toString() !== userId) {
        return Promise.reject(new OtherUserError('You can\'t delete someone elses card'));
      }
      return Promise.resolve();
    });
};

module.exports = mongoose.model('card', cardSchema);
