// src/api/v1/controllers/events.controller.js
const eventService = require('../../../services/event.service');
const { validate, schemas } = require('../../../utils/validator');

const list = async (req, res, next) => {
  try {
    const filters = {};
    if (req.query.organizerId) filters.organizerId = req.query.organizerId;
    if (req.query.date) filters.date = req.query.date;
    const events = await eventService.listEvents(filters);
    res.json({ events });
  } catch (err) {
    next(err);
  }
};

const get = async (req, res, next) => {
  try {
    const event = await eventService.getEvent(req.params.id);
    res.json({ event });
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const payload = validate(schemas.eventCreateSchema, req.body);
    const organizerId = req.user.id;
    const event = await eventService.createEvent({ ...payload, organizerId });
    res.status(201).json({ event });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const payload = validate(schemas.eventUpdateSchema, req.body);
    const updated = await eventService.updateEvent(req.params.id, payload, req.user.id);
    res.json({ event: updated });
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    await eventService.deleteEvent(req.params.id, req.user.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

const register = async (req, res, next) => {
  try {
    const result = await eventService.registerForEvent(req.params.id, req.user.id);
    res.status(200).json({ event: result });
  } catch (err) {
    next(err);
  }
};

const getParticipants = async (req, res, next) => {
  try {
    const participants = await eventService.getParticipants(req.params.id);
    res.status(200).json({
      success: true,
      data: participants,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  list,
  get,
  create,
  update,
  remove,
  register,
  getParticipants
};
