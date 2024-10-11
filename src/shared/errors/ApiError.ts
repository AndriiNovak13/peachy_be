/* eslint-disable @typescript-eslint/no-explicit-any */

export class ApiError extends Error {
  status;
  error;
  constructor(status: number, message: string, error: string) {
    super(message);
    this.status = status;
    this.message = message;
    this.error = error;
    Error.captureStackTrace(this, this.constructor);
  }

  static UnauthorizedError(
    message = "Unauthorized Error",
    error = "Unauthorized"
  ) {
    return new ApiError(401, message, error);
  }

  static ForbiddenError(message = "Forbidden Error", error = "Forbidden") {
    return new ApiError(403, message, error);
  }

  static BadRequest(message: any, error = "Bad Request") {
    return new ApiError(400, message, error);
  }

  static NotFound(message: string, error = "Not found") {
    return new ApiError(404, message, error);
  }
}
