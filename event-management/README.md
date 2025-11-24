# Event Management API

A RESTful API for managing events, user authentication, and event registrations built with Node.js and Express.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
  - [Authentication](#authentication)
  - [Events](#events)
- [Error Handling](#error-handling)
- [Security](#security)
- [Testing](#testing)

## Features

- 🔐 User authentication with JWT
- 👥 Role-based access control (Attendee, Organizer, Admin)
- 📅 Event creation and management
- 📝 Event registration system
- 📧 Email notifications
- 🔒 Rate limiting
- 🛡️ Security headers with Helmet
- 📊 Request logging with Morgan
- ✅ Input validation with Joi

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js v5
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcrypt
- **Validation**: Joi
- **Email**: Nodemailer
- **Logging**: Winston & Morgan
- **Security**: Helmet, CORS, express-rate-limit
- **Testing**: Jest & Supertest

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd event-management
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory (see [Environment Variables](#environment-variables))

4. Start the server
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:4000` by default.

### Available Scripts

```bash
npm start       # Start the server
npm run dev     # Start with nodemon (auto-reload)
npm test        # Run tests
npm run lint    # Run ESLint
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=4000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRES_IN=2h

# Bcrypt Configuration
BCRYPT_SALT_ROUNDS=10

# Email Configuration (SMTP)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
FROM_EMAIL=your-email@gmail.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX=100
```

## API Documentation

Base URL: `http://localhost:4000/api/v1`

### Authentication

#### Register a New User

**Endpoint**: `POST /auth/register`

**Description**: Create a new user account

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "attendee"
}
```

**Fields**:
- `name` (string, required): User's full name (min 1 character)
- `email` (string, required): Valid email address
- `password` (string, required): Password (min 6 characters)
- `role` (string, optional): User role - `attendee`, `organizer`, or `admin` (default: `attendee`)

**Response** (201 Created):
```json
{
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "attendee",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

#### Login

**Endpoint**: `POST /auth/login`

**Description**: Authenticate user and receive JWT token

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response** (200 OK):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "attendee"
  }
}
```

---

#### Get Current User Profile

**Endpoint**: `GET /auth/me`

**Description**: Get authenticated user's profile

**Headers**:
```
Authorization: Bearer <token>
```

**Response** (200 OK):
```json
{
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "attendee",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

#### Get My Events

**Endpoint**: `GET /auth/me/events`

**Description**: Get all events the authenticated user has registered for or organized

**Headers**:
```
Authorization: Bearer <token>
```

**Response** (200 OK):
```json
{
  "events": [
    {
      "id": "uuid",
      "title": "Tech Conference 2024",
      "description": "Annual technology conference",
      "date": "2024-12-15",
      "time": "09:00",
      "location": "Convention Center",
      "organizerId": "uuid",
      "participants": ["uuid1", "uuid2"],
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### Events

#### List All Events

**Endpoint**: `GET /events`

**Description**: Get a list of all events (public access)

**Query Parameters**:
- `organizerId` (optional): Filter by organizer ID
- `date` (optional): Filter by date (YYYY-MM-DD)

**Example**: `GET /events?date=2024-12-15`

**Response** (200 OK):
```json
{
  "events": [
    {
      "id": "uuid",
      "title": "Tech Conference 2024",
      "description": "Annual technology conference",
      "date": "2024-12-15",
      "time": "09:00",
      "location": "Convention Center",
      "organizerId": "uuid",
      "participants": ["uuid1", "uuid2"],
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

#### Get Event by ID

**Endpoint**: `GET /events/:id`

**Description**: Get details of a specific event (public access)

**Response** (200 OK):
```json
{
  "event": {
    "id": "uuid",
    "title": "Tech Conference 2024",
    "description": "Annual technology conference",
    "date": "2024-12-15",
    "time": "09:00",
    "location": "Convention Center",
    "organizerId": "uuid",
    "participants": ["uuid1", "uuid2"],
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

#### Create Event

**Endpoint**: `POST /events`

**Description**: Create a new event (requires organizer or admin role)

**Headers**:
```
Authorization: Bearer <token>
```

**Request Body**:
```json
{
  "title": "Tech Conference 2024",
  "description": "Annual technology conference",
  "date": "2024-12-15",
  "time": "09:00",
  "location": "Convention Center"
}
```

**Fields**:
- `title` (string, required): Event title (min 3 characters)
- `description` (string, optional): Event description
- `date` (string, required): Event date in YYYY-MM-DD format
- `time` (string, required): Event time in HH:MM format (24-hour)
- `location` (string, optional): Event location

**Response** (201 Created):
```json
{
  "event": {
    "id": "uuid",
    "title": "Tech Conference 2024",
    "description": "Annual technology conference",
    "date": "2024-12-15",
    "time": "09:00",
    "location": "Convention Center",
    "organizerId": "uuid",
    "participants": [],
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

#### Update Event

**Endpoint**: `PUT /events/:id`

**Description**: Update an existing event (requires organizer role and ownership)

**Headers**:
```
Authorization: Bearer <token>
```

**Request Body** (all fields optional):
```json
{
  "title": "Updated Tech Conference 2024",
  "description": "Updated description",
  "date": "2024-12-16",
  "time": "10:00",
  "location": "New Convention Center"
}
```

**Response** (200 OK):
```json
{
  "event": {
    "id": "uuid",
    "title": "Updated Tech Conference 2024",
    "description": "Updated description",
    "date": "2024-12-16",
    "time": "10:00",
    "location": "New Convention Center",
    "organizerId": "uuid",
    "participants": ["uuid1"],
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

#### Delete Event

**Endpoint**: `DELETE /events/:id`

**Description**: Delete an event (requires organizer role and ownership)

**Headers**:
```
Authorization: Bearer <token>
```

**Response** (204 No Content)

---

#### Register for Event

**Endpoint**: `POST /events/:id/register`

**Description**: Register the authenticated user for an event

**Headers**:
```
Authorization: Bearer <token>
```

**Response** (200 OK):
```json
{
  "event": {
    "id": "uuid",
    "title": "Tech Conference 2024",
    "description": "Annual technology conference",
    "date": "2024-12-15",
    "time": "09:00",
    "location": "Convention Center",
    "organizerId": "uuid",
    "participants": ["uuid1", "uuid2", "current-user-uuid"],
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

#### Get Event Participants

**Endpoint**: `GET /events/:id/participants`

**Description**: Get list of participants for an event (requires authentication)

**Headers**:
```
Authorization: Bearer <token>
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid1",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "attendee"
    },
    {
      "id": "uuid2",
      "name": "Jane Smith",
      "email": "jane@example.com",
      "role": "attendee"
    }
  ]
}
```

---

### Health Check

**Endpoint**: `GET /health`

**Description**: Check API health status

**Response** (200 OK):
```json
{
  "status": "ok",
  "uptime": 12345.67
}
```

---

## Error Handling

The API uses standard HTTP status codes and returns errors in the following format:

```json
{
  "message": "Error message description",
  "status": 400
}
```

### Common Status Codes

- `200 OK`: Request successful
- `201 Created`: Resource created successfully
- `204 No Content`: Request successful, no content to return
- `400 Bad Request`: Invalid request data
- `401 Unauthorized`: Missing or invalid authentication token
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: Server error

### Example Error Response

```json
{
  "message": "\"email\" must be a valid email",
  "status": 400
}
```

## Security

### Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### Role-Based Access Control

Three user roles are supported:

1. **Attendee** (default)
   - Can register for events
   - Can view their registered events
   - Can view public event listings

2. **Organizer**
   - All attendee permissions
   - Can create events
   - Can update/delete their own events
   - Can view participants of their events

3. **Admin**
   - All organizer permissions
   - Can manage any event

### Security Features

- **Helmet**: Sets security-related HTTP headers
- **CORS**: Cross-Origin Resource Sharing enabled
- **Rate Limiting**: Prevents abuse (100 requests per minute by default)
- **Password Hashing**: Bcrypt with configurable salt rounds
- **Input Validation**: Joi schema validation on all inputs
- **JWT Expiration**: Tokens expire after 2 hours (configurable)

## Testing

Run the test suite:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Test Structure

```
src/tests/
├── integration/     # API endpoint tests
└── unit/           # Unit tests for services, models, etc.
```

## Project Structure

```
event-management/
├── src/
│   ├── api/
│   │   └── v1/
│   │       ├── controllers/    # Request handlers
│   │       ├── routes/         # Route definitions
│   │       └── validators/     # Request validators
│   ├── config/                 # Configuration files
│   ├── jobs/                   # Background jobs (reminders)
│   ├── middlewares/            # Express middlewares
│   ├── models/                 # Data models
│   ├── repositories/           # Data access layer
│   ├── services/               # Business logic
│   ├── tests/                  # Test files
│   ├── utils/                  # Utility functions
│   ├── app.js                  # Express app setup
│   └── server.js               # Server entry point
├── .env                        # Environment variables
├── package.json
└── README.md
```

## Additional Features

### Email Notifications

The API includes email notification functionality for:
- Event registration confirmations
- Event reminders (scheduled job)

Configure SMTP settings in the `.env` file to enable email features.

### Logging

- **Winston**: Structured logging to files and console
- **Morgan**: HTTP request logging

Logs are stored in the application directory and include:
- Error logs
- Combined logs (all requests)
- Console output in development

