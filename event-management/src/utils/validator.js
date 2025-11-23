// src/utils/validators.js
const Joi = require('joi');

const email = Joi.string().email();
const password = Joi.string().min(6);
const name = Joi.string().min(1);

const registerSchema = Joi.object({
  name: name.required(),
  email: email.required(),
  password: password.required(),
  role: Joi.string().valid('attendee', 'organizer', 'admin').default('attendee'),
});

const loginSchema = Joi.object({
  email: email.required(),
  password: password.required(),
});

const eventCreateSchema = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().allow('').optional(),
  date: Joi.string().regex(/^\d{4}-\d{2}-\d{2}$/).required(), // YYYY-MM-DD
  time: Joi.string().regex(/^\d{2}:\d{2}$/).required(), // HH:MM
  location: Joi.string().allow('', null),
});

const eventUpdateSchema = Joi.object({
  title: Joi.string().min(3).optional(),
  description: Joi.string().allow('').optional(),
  date: Joi.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  time: Joi.string().regex(/^\d{2}:\d{2}$/).optional(),
  location: Joi.string().allow('', null).optional(),
});

module.exports = {
  schemas: {
    registerSchema,
    loginSchema,
    eventCreateSchema,
    eventUpdateSchema,
  },
  validate: (schema, data) => {
    const { error, value } = schema.validate(data, { abortEarly: false, stripUnknown: true });
    if (error) {
      const err = new Error(error.details.map((d) => d.message).join(', '));
      err.status = 400;
      throw err;
    }
    return value;
  },
};
