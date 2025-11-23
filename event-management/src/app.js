const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const routesV1 = require('./api/v1/routes/index');
const { errorHandler } = require('./middlewares/error.middleware');
const rateLimitMiddleware = require('./middlewares/rateLimit.middleware');
const logger = require('./utils/logger');

const createApp = () => {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Logging
  app.use(morgan('combined', { stream: logger.stream }));

  // Rate limit (global)
  app.use(rateLimitMiddleware());

  // API routes
  app.use('/api/v1', routesV1);

  // Health check
  app.get('/health', (req, res) => res.json({ status: 'ok', uptime: process.uptime() }));

  // Error handler (should be last)
  app.use(errorHandler);

  return app;
};

module.exports = createApp;
