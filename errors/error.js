class ServerError extends Error {
  constructor(action) {
    super(`Internal Server Error - couldn't ${action} uesr`);
    this.name = "ServerError";
    this.statusCode = 500;
  }
}

class NotFoundError extends Error {
  constructor(entity) {
    super(`${entity} not found`);
    this.name = "NotFoundError";
    this.statusCode = 404;
  }
}

class BadRequestError extends Error {
  constructor(element) {
    super(`please provide : ${element}`);
    this.name = "BadRequestError";
    this.statusCode = 400;
  }
}

module.exports = {
  ServerError,
  NotFoundError,
  BadRequestError}