import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/apiError";

/**
 * Global error handling middleware for Express
 *
 * This middleware handles errors thrown in the application.
 * It differentiates between custom ApiError instances and generic errors.
 */
export const errorHandler = (
  err: ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  // If the error is an instance of our custom ApiError
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message, // Custom error message
    });
  }
  // Handle generic or unexpected errors
  res.status(500).json({
    success: false,
    message: "Internal Server Error", // Default message for unexpected errors
  });
};
