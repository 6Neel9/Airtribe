const eventService = require('../.././services/event.service');
const eventRepository = require('../../src/repositories/event.repository');

describe('Event Service - Unit Tests', () => {
  beforeEach(() => {
    // reset in-memory data before every test
    eventRepository.events = [];
  });

  test('should create a new event', async () => {
    const newEvent = {
      title: 'Tech Meetup',
      date: '2025-01-01',
      time: '18:00',
      description: 'Discuss new JS trends'
    };

    const result = await eventService.createEvent(newEvent, 'user123');

    expect(result).toHaveProperty('id');
    expect(result.title).toBe(newEvent.title);
    expect(result.createdBy).toBe('user123');
  });

  test('should return list of events', async () => {
    await eventService.createEvent(
      { title: 'Event A', date: '2025-01-01', time: '10:00', description: 'Desc' },
      'user1'
    );

    const events = await eventService.getAllEvents();

    expect(events.length).toBe(1);
  });

  test('should update an event', async () => {
    const event = await eventService.createEvent(
      { title: 'Event Old', date: '2025-01-01', time: '10:00', description: 'Old desc' },
      'user1'
    );

    const updated = await eventService.updateEvent(event.id, {
      title: 'Event Updated'
    });

    expect(updated.title).toBe('Event Updated');
  });

  test('should delete event', async () => {
    const event = await eventService.createEvent(
      { title: 'Event X', date: '2025-01-01', time: '10:00', description: 'desc' },
      'user1'
    );

    const deleted = await eventService.deleteEvent(event.id);
    expect(deleted).toBe(true);

    const events = await eventService.getAllEvents();
    expect(events.length).toBe(0);
  });

  test('should register participant', async () => {
    const event = await eventService.createEvent(
      { title: 'Event Y', date: '2025-01-01', time: '10:00', description: 'desc' },
      'user1'
    );

    const result = await eventService.registerParticipant(event.id, 'attendee1');

    expect(result.participants).toContain('attendee1');
  });
});
