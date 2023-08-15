const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/authorization-error');

const { JWT_SECRET = 'dev-key' } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthorizationError('Authorization Required');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new AuthorizationError('Authorization Required');
  }

  req.user = payload;
  console.log(payload);

  next();
};
