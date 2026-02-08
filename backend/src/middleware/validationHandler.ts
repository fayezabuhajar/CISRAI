import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstError = errors.array()[0];
    // Log validation errors for debugging bad request responses
    console.log("Validation errors:", errors.array());
    res.status(400).json({
      success: false,
      message: firstError?.msg || "Validation error",
      errors: errors.array(),
    });
    return;
  }
  next();
};
