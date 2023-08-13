const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/authorization-error');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization);

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthorizationError('Authorization Required');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    throw new AuthorizationError('Authorization Required');
  }

  req.user = payload;
  console.log(payload);

  next();
};