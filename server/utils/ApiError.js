class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode || 500;
    this.status = statusCode >= 400 && statusCode < 500 ? 'fail' : 'error';
    
    // Capture stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApiError; 