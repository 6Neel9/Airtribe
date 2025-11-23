// src/api/v1/validators/auth.validator.js
// (Not strictly necessary - using central validators util currently)
// kept for future per-route validators
const { schemas } = require('../../../utils/validator');

module.exports = {
  registerSchema: schemas.registerSchema,
  loginSchema: schemas.loginSchema,
};
