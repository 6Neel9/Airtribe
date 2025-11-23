// src/repositories/user.repository.js
const { v4: uuidv4 } = require('uuid');
const User = require('../models/user.model');

const users = []; // in-memory store

const createUser = async ({ name, email, passwordHash, role = 'attendee' }) => {
  const user = new User({ id: uuidv4(), name, email: email.toLowerCase(), passwordHash, role });
  users.push(user);
  return user;
};

const findByEmail = async (email) => {
  if (!email) return null;
  return users.find((u) => u.email === email.toLowerCase()) || null;
};

const findById = async (id) => users.find((u) => u.id === id) || null;

const listUsers = async () => users.slice();

const updateUser = async (id, patch) => {
  const user = await findById(id);
  if (!user) return null;
  Object.assign(user, patch);
  return user;
};

const deleteUser = async (id) => {
  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1) return false;
  users.splice(idx, 1);
  return true;
};

module.exports = {
  createUser,
  findByEmail,
  findById,
  listUsers,
  updateUser,
  deleteUser,
  // expose raw for tests/inspection (careful in prod)
  _store: users,
};
