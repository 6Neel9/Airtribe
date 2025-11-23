// src/repositories/event.repository.js
const { v4: uuidv4 } = require('uuid');
const Event = require('../models/event.model');

const events = []; // in-memory store

const createEvent = async ({ title, description, date, time, organizerId, location = null }) => {
  const event = new Event({ id: uuidv4(), title, description, date, time, organizerId, location, participants: [] });
  events.push(event);
  return event;
};

const findById = async (id) => events.find((e) => e.id === id) || null;

const listEvents = async (filters = {}) => {
  // simple filtering - by organizerId or date
  return events.filter((e) => {
    if (filters.organizerId && e.organizerId !== filters.organizerId) return false;
    if (filters.date && e.date !== filters.date) return false;
    return true;
  });
};

const updateEvent = async (id, patch) => {
  const event = await findById(id);
  if (!event) return null;
  Object.assign(event, patch);
  return event;
};

const deleteEvent = async (id) => {
  const idx = events.findIndex((e) => e.id === id);
  if (idx === -1) return false;
  events.splice(idx, 1);
  return true;
};

const addParticipant = async (eventId, userId) => {
  const event = await findById(eventId);
  if (!event) throw new Error('Event not found');
  if (event.participants.includes(userId)) throw new Error('Already registered');
  event.participants.push(userId);
  return event;
};

const removeParticipant = async (eventId, userId) => {
  const event = await findById(eventId);
  if (!event) throw new Error('Event not found');
  const idx = event.participants.indexOf(userId);
  if (idx === -1) throw new Error('User not a participant');
  event.participants.splice(idx, 1);
  return event;
};

module.exports = {
  createEvent,
  findById,
  listEvents,
  updateEvent,
  deleteEvent,
  addParticipant,
  removeParticipant,
  _store: events,
};
