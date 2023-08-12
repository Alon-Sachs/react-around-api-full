const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const AuthorizationError = require('../errors/authorization-error');

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(() => {
      throw new NotFoundError('There is no user with the requested id');
    })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.getSelf = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(() => {
      throw new NotFoundError('There is no user with the requested id');
    })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;
  console.log("Name:", name);
console.log("About:", about);
console.log("Avatar:", avatar);
console.log("Email:", email);
console.log("Password:", password);
  bcrypt.hash(password, 10)
    .then(hash => {
      User.create({ name, about, avatar, email, password: hash, })
    })
    .orFail(() => {
      throw new BadRequestError('Validation Error');
    })
    .then((user) => res.send({ data: user }))
    .catch(next)
};

module.exports.updateUserProfile = (req, res) => {
  const { name, about } = req.body;
  const id = req.user._id;
  User.findByIdAndUpdate(id, { name, about }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFoundError('There is no user with the requested id');
    })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  const id = req.user._id;
  User.findByIdAndUpdate(id, { avatar }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFoundError('There is no user with the requested id');
    })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET,
        { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(() => {
      next(new AuthorizationError('Validation Error'));
    });
};
