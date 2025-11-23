// src/models/user.model.js
class User {
  constructor({ id, name, email, passwordHash, role = 'attendee', createdAt = new Date() }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.passwordHash = passwordHash;
    this.role = role; // 'attendee' or 'organizer' (or 'admin')
    this.createdAt = createdAt;
  }

  toJSON() {
    const { passwordHash, ...rest } = this;
    return rest;
  }
}

module.exports = User;
