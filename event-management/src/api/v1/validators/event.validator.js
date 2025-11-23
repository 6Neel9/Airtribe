// src/api/v1/validators/event.validator.js
const { schemas } = require('../../../utils/validator');

module.exports = {
  eventCreateSchema: schemas.eventCreateSchema,
  eventUpdateSchema: schemas.eventUpdateSchema,
};
