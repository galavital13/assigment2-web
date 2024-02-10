const winston = require('winston');

const logger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log' }),
  ],
});

const errorHandler = (err, req, res, next) => {
  if (err instanceof SyntaxError) {
    res.status(400).send({ error: 'Invalid JSON payload' });
  } else if (err.status) { 
    res.status(err.status).send({ error: err.message });
  } else { 
    res.status(500).send({ error: 'Internal Server Error' });
  }

  logger.error({
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
  });

  next(err); 
};

module.exports = errorHandler;
