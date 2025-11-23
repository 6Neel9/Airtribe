require('dotenv').config();
const http = require('http');
const createApp = require('./app');
const config = require('./config');
const logger = require('./utils/logger');

const app = createApp();

const port = config.port || 4000;

const server = http.createServer(app);

server.listen(port, () => {
  logger.info(`Server started on port ${port} (env=${config.nodeEnv})`);
});

const gracefulShutdown = (signal) => {
  logger.info(`Received ${signal}. Shutting down gracefully...`);
  server.close((err) => {
    if (err) {
      logger.error('Error during server close', err);
      process.exit(1);
    }
    logger.info('Shutdown complete.');
    process.exit(0);
  });

  // Force exit after 10s
  setTimeout(() => {
    logger.warn('Forcing shutdown after 10s.');
    process.exit(1);
  }, 10000);
};

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
