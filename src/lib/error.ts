export class AppError extends Error {
  statusCode: number;
  code: string;
  isOperational: boolean;
  timestamp: string;
  constructor(
    message: string = "An unexpected error occurred",
    statusCode: number = 500,
    code: string = "INTERNAL_ERROR",
    isOperational: boolean = true
  ) {
    super(message);

    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = isOperational; // Distinguishes operational errors from programming errors
    this.timestamp = new Date().toISOString();

    // Maintains proper stack trace for where error was thrown
    Error.captureStackTrace(this, this.constructor);
  }
}

// Specific error types
export class ValidationError extends AppError {
  field: string | null;
  constructor(message: string | undefined, field = null) {
    super(message, 400, "VALIDATION_ERROR");
    this.field = field;
  }
}

export class NotFoundError extends AppError {
  resource: string;
  constructor(resource = "Resource") {
    super(`${resource} not found`, 404, "NOT_FOUND");
    this.resource = resource;
  }
}

export class AuthenticationError extends AppError {
  constructor(message = "Authentication required") {
    super(message, 401, "AUTHENTICATION_ERROR");
  }
}

export class AuthorizationError extends AppError {
  constructor(message = "Insufficient permissions") {
    super(message, 403, "AUTHORIZATION_ERROR");
  }
}

export class ConflictError extends AppError {
  conflictingResource: string | null;
  constructor(message: string, conflictingResource = null) {
    super(message, 409, "CONFLICT_ERROR");
    this.conflictingResource = conflictingResource;
  }
}

export class RateLimitError extends AppError {
  retryAfter: number | null;
  constructor(message: string = "Rate limit exceeded", retryAfter = null) {
    super(message, 429, "RATE_LIMIT_ERROR");
    this.retryAfter = retryAfter;
  }
}

export class ExternalServiceError extends AppError {
  service: string;
  constructor(message: string, service = "External service") {
    super(message, 502, "EXTERNAL_SERVICE_ERROR");
    this.service = service;
  }
}
