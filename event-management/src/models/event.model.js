// src/models/event.model.js
class Event {
  constructor({
    id,
    title,
    description,
    date, // 'YYYY-MM-DD'
    time, // 'HH:MM'
    organizerId,
    createdAt = new Date(),
    participants = [],
    location = null
  }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.date = date;
    this.time = time;
    this.organizerId = organizerId;
    this.createdAt = createdAt;
    this.participants = participants; // array of user ids
    this.location = location;
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      date: this.date,
      time: this.time,
      organizerId: this.organizerId,
      participants: this.participants,
      createdAt: this.createdAt,
      location: this.location
    };
  }
}

module.exports = Event;
