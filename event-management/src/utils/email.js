// src/utils/email.js
const nodemailer = require('nodemailer');
const config = require('../config');
const logger = require('./logger');

const createTransporter = () => {
  const { host, port, user, pass } = config.email;
  if (!host || !user) {
    logger.warn('Email host/user not configured. Emails will fail if attempted.');
  }
  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for other ports
    auth: user ? { user, pass } : undefined,
  });
};

const transporter = createTransporter();

const sendEmail = async ({ to, subject, text, html }) => {
  const from = config.email.from;
  const info = await transporter.sendMail({ from, to, subject, text, html });
  logger.info(`Email sent to ${to}. messageId=${info.messageId}`);
  return info;
};

module.exports = {
  sendEmail,
  transporter,
};
