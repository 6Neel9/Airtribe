const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');
const jwtConfig = require('../config/jwt');
const userRepo = require('../repositories/user.repository');
const notificationService = require('./notification.service');

const register = async ({ name, email, password, role = 'attendee' }) => {
  const existing = await userRepo.findByEmail(email);
  if (existing) {
    const err = new Error('Email already registered');
    err.status = 409;
    throw err;
  }
  const saltRounds = config.bcrypt.saltRounds;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const user = await userRepo.createUser({ name, email, passwordHash, role });

  // send welcome email (async, but await so errors bubble if email config broken)
  try {
    await notificationService.sendWelcomeEmail(user);
  } catch (e) {
    // Log but don't break registration
    console.error('Failed to send welcome email:', e.message || e);
  }

  return user;
};

const login = async ({ email, password }) => {
  const user = await userRepo.findByEmail(email);
  if (!user) {
    const err = new Error('Invalid credentials');
    err.status = 401;
    throw err;
  }
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    const err = new Error('Invalid credentials');
    err.status = 401;
    throw err;
  }

  const payload = {
    sub: user.id,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(payload, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
  return { user: user.toJSON(), token };
};

const getProfile = async (userId) => {
  const user = await userRepo.findById(userId);
  if (!user) return null;
  return user.toJSON();
};

module.exports = {
  register,
  login,
  getProfile,
};
