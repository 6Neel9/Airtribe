// src/utils/logger.js
const winston = require('winston');

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: winston.format.combine(winston.format.timestamp(), winston.format.simple()),
  transports: [new winston.transports.Console()],
});

// morgan stream
logger.stream = {
  write: (message) => {
    logger.info(message.trim());
  },
};

module.exports = logger;
