// src/middleware/globalErrorHandler.ts
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ErrorRequestHandler } from 'express';

class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message = 'Something went wrong',
    public error = 'Unexpected Error'
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // Custom API errors
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      status: err.statusCode,
      success: false,
      error: err.error,
      message: err.message,
    });
  }

  // Generic Prisma errors
  if (err instanceof PrismaClientKnownRequestError) {
    return res.status(400).json({
      status: 400,
      success: false,
      error: 'Database error',
      message: err.message,
    });
  }

  // Fallback
  return res.status(500).json({
    status: 500,
    success: false,
    error: err.message || 'Something went wrong',
    message: 'Internal Server Error',
  });
};

export { ApiError, globalErrorHandler };
