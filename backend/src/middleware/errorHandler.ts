import { Request, Response, NextFunction } from "express";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export const errorHandler = (
  error: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const status = error instanceof ApiError ? error.status : 500;
  const message = error.message || "Internal Server Error";

  console.error(`[ERROR] ${status} - ${message}`, error);

  res.status(status).json({
    success: false,
    message,
    code: status,
    ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
  });
};

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const error = new ApiError(404, `Route not found: ${req.originalUrl}`);
  next(error);
};
