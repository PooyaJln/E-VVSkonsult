class validationError extends Error {
  constructor(message, property) {
    super(message);
    this.property = property;
  }
}

class expressError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

class notFoundError extends expressError {
  constructor(message, status) {
    super(message, status);
    this.status = 404;
  }
}

class badRequestError extends expressError {
  constructor(message, status) {
    super(message, status);
    this.status = 400;
  }
}

module.exports = {
  validationError,
  expressError,
  notFoundError,
  badRequestError,
};
