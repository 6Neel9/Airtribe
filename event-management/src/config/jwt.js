const config = require('./index');

module.exports = {
  secret: config.jwt.secret,
  expiresIn: config.jwt.expiresIn,
};
