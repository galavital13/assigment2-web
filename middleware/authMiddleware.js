const logger = require("../logger");
const { NotFoundError, ServerError } = require("../errors/errorHandler");

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  logger.error(err.stack);

  if (err instanceof NotFoundError || err instanceof ServerError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  res.status(500).json({ error: "Internal Server Error" });
};

module.exports = errorHandler;
