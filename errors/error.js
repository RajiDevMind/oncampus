const logger = require("logger");
// Centralized error handler middleware
const errorHandler = (err, req, res, next) => {
  logger.error(`Error: ${err.message}`);
  res.status(err.status || 500).json({ error: err.message });
};

// Register the error handler middleware
module.exports = errorHandler;
