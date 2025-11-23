// src/api/v1/controllers/auth.controller.js
const authService = require('../../../services/auth.service');
const eventService = require('../../../services/event.service');
const { validate, schemas } = require('../../../utils/validator');

const register = async (req, res, next) => {
  try {
    const payload = validate(schemas.registerSchema, req.body);
    const user = await authService.register(payload);
    res.status(201).json({ user: user.toJSON ? user.toJSON() : user });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const payload = validate(schemas.loginSchema, req.body);
    const result = await authService.login(payload);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const me = async (req, res, next) => {
  try {
    const profile = await authService.getProfile(req.user.id);
    if (!profile) return res.status(404).json({ message: 'User not found' });
    res.json({ user: profile });
  } catch (err) {
    next(err);
  }
};

const myEvents = async (req, res, next) => {
  try {
    // find events where the user is a participant or organizer
    const events = await eventService.listEvents();
    const mine = events.filter((e) => e.participants.includes(req.user.id) || e.organizerId === req.user.id);
    res.json({ events: mine });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
  me,
  myEvents,
};
