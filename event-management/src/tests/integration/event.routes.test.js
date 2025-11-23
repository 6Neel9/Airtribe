const request = require('supertest');
const app = require('../../app');
const authService = require('../../src/services/auth.service');
const eventRepository = require('../../src/repositories/event.repository');
const userRepository = require('../../src/repositories/user.repository');

describe('Event Routes – Integration Tests', () => {
  let token;

  beforeEach(async () => {
    // reset memory data
    eventRepository.events = [];
    userRepository.users = [];

    // register a user and login
    await authService.register({
      name: 'Organizer',
      email: 'org@test.com',
      password: '123456',
      role: 'organizer'
    });

    const loginResult = await authService.login({
      email: 'org@test.com',
      password: '123456'
    });

    token = loginResult.token;
  });

  test('POST /api/v1/events should create event', async () => {
    const res = await request(app)
      .post('/api/v1/events')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'New Event',
        date: '2025-01-01',
        time: '18:00',
        description: 'Test event'
      });

    expect(res.status).toBe(201);
    expect(res.body.data.title).toBe('New Event');
  });

  test('GET /api/v1/events should return events list', async () => {
    await request(app)
      .post('/api/v1/events')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'New Event',
        date: '2025-01-01',
        time: '18:00',
        description: 'Test event'
      });

    const res = await request(app).get('/api/v1/events');

    expect(res.status).toBe(200);
    expect(res.body.data.length).toBe(1);
  });

  test('PUT /api/v1/events/:id should update event', async () => {
    const createRes = await request(app)
      .post('/api/v1/events')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Old Event',
        date: '2025-01-01',
        time: '18:00',
        description: 'desc'
      });

    const id = createRes.body.data.id;

    const updateRes = await request(app)
      .put(`/api/v1/events/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Updated Event' });

    expect(updateRes.status).toBe(200);
    expect(updateRes.body.data.title).toBe('Updated Event');
  });

  test('POST /api/v1/events/:id/register should register user', async () => {
    const createRes = await request(app)
      .post('/api/v1/events')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Reg Event',
        date: '2025-01-01',
        time: '18:00',
        description: 'desc'
      });

    const eventId = createRes.body.data.id;

    const regRes = await request(app)
      .post(`/api/v1/events/${eventId}/register`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(regRes.status).toBe(200);
    expect(regRes.body.data.participants.length).toBe(1);
  });

  test('DELETE /api/v1/events/:id should delete event', async () => {
    const createRes = await request(app)
      .post('/api/v1/events')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Delete Event',
        date: '2025-01-01',
        time: '18:00',
        description: 'desc'
      });

    const eventId = createRes.body.data.id;

    const delRes = await request(app)
      .delete(`/api/v1/events/${eventId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(delRes.status).toBe(200);

    const listRes = await request(app).get('/api/v1/events');
    expect(listRes.body.data.length).toBe(0);
  });
});
