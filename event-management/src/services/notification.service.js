// src/services/notification.service.js
const emailUtil = require('../utils/email');

const sendWelcomeEmail = async (user) => {
  const subject = `Welcome to Virtual Events, ${user.name || ''}`;
  const text = `Hi ${user.name || user.email},\n\nThanks for registering as a ${user.role}.\n\nRegards,\nVirtual Events Team`;
  await emailUtil.sendEmail({ to: user.email, subject, text });
};

const notifyRegistration = async (user, event) => {
  const subject = `Registration confirmed: ${event.title}`;
  const text = `Hi ${user.name || user.email},\n\nYou are registered for "${event.title}" on ${event.date} at ${event.time}.\n\nThanks,\nVirtual Events Team`;
  await emailUtil.sendEmail({ to: user.email, subject, text });
};

// generic event creation notification (optional)
const notifyEventCreated = async (organizer, event) => {
  const subject = `Event created: ${event.title}`;
  const text = `Hi ${organizer.name || organizer.email},\n\nYour event "${event.title}" has been created for ${event.date} ${event.time}.\n\nThanks,\nVirtual Events Team`;
  await emailUtil.sendEmail({ to: organizer.email, subject, text });
};

module.exports = {
  sendWelcomeEmail,
  notifyRegistration,
  notifyEventCreated,
};
