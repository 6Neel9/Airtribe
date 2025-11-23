// src/services/event.service.js
const eventRepo = require('../repositories/event.repository');
const userRepo = require('../repositories/user.repository');
const notificationService = require('./notification.service');

const createEvent = async ({ title, description, date, time, organizerId, location }) => {
  // validate organizer exists
  const organizer = await userRepo.findById(organizerId);
  if (!organizer) {
    const err = new Error('Organizer not found');
    err.status = 404;
    throw err;
  }
  const event = await eventRepo.createEvent({ title, description, date, time, organizerId, location });
  return event.toJSON();
};

const updateEvent = async (eventId, patch, requesterId) => {
  const event = await eventRepo.findById(eventId);
  if (!event) {
    const err = new Error('Event not found');
    err.status = 404;
    throw err;
  }
  // only organizer or admin can update
  if (event.organizerId !== requesterId) {
    const requester = await userRepo.findById(requesterId);
    if (!requester || requester.role !== 'admin') {
      const err = new Error('Forbidden');
      err.status = 403;
      throw err;
    }
  }
  const updated = await eventRepo.updateEvent(eventId, patch);
  return updated.toJSON();
};

const deleteEvent = async (eventId, requesterId) => {
  const event = await eventRepo.findById(eventId);
  if (!event) {
    const err = new Error('Event not found');
    err.status = 404;
    throw err;
  }
  if (event.organizerId !== requesterId) {
    const requester = await userRepo.findById(requesterId);
    if (!requester || requester.role !== 'admin') {
      const err = new Error('Forbidden');
      err.status = 403;
      throw err;
    }
  }
  const ok = await eventRepo.deleteEvent(eventId);
  return ok;
};

const listEvents = async (filters = {}) => {
  const evts = await eventRepo.listEvents(filters);
  return evts.map((e) => e.toJSON());
};

const getEvent = async (id) => {
  const e = await eventRepo.findById(id);
  if (!e) {
    const err = new Error('Event not found');
    err.status = 404;
    throw err;
  }
  return e.toJSON();
};

const registerForEvent = async (eventId, userId) => {
  const user = await userRepo.findById(userId);
  if (!user) {
    const err = new Error('User not found');
    err.status = 404;
    throw err;
  }
  const event = await eventRepo.findById(eventId);
  if (!event) {
    const err = new Error('Event not found');
    err.status = 404;
    throw err;
  }
  // Add participant (will throw if already registered)
  const updated = await eventRepo.addParticipant(eventId, userId);

  // Notify user asynchronously (we'll await but swallow errors)
  try {
    await notificationService.notifyRegistration(user, updated);
  } catch (e) {
    console.error('Failed to send registration email:', e.message || e);
  }

  return updated.toJSON();
};

const getParticipants = (eventId) => {
  const event = events.find(e => e.id === eventId);
  if (!event) return null;
  return event.participants || [];
};


module.exports = {
  createEvent,
  updateEvent,
  deleteEvent,
  listEvents,
  getEvent,
  registerForEvent,
  getParticipants
};
