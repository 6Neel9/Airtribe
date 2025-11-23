// src/jobs/sendEventReminders.job.js
// Simple job skeleton - call it from an external scheduler if needed
const eventRepo = require('../repositories/event.repository');
const userRepo = require('../repositories/user.repository');
const notification = require('../services/notification.service');

const sendReminders = async () => {
  const events = await eventRepo.listEvents();
  // naive: find events for today and notify participants (demo)
  const today = new Date().toISOString().slice(0, 10);
  for (const e of events) {
    if (e.date === today) {
      for (const userId of e.participants) {
        const user = await userRepo.findById(userId);
        if (user) {
          try {
            await notification.notifyRegistration(user, e);
          } catch (err) {
            console.error('Reminder email failed:', err.message || err);
          }
        }
      }
    }
  }
};

module.exports = { sendReminders };
