import { Request, Response } from "express";
import { authService } from "../services/auth.service";
import { adminService } from "../services/admin.service";
import { successResponse, errorResponse } from "../utils/response";

interface AuthenticatedRequest extends Request {
  user?: { id: string; email: string; role: string };
}

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
};

export const authController = {
  async register(req: Request, res: Response) {
    try {
      const { email, password, firstName, lastName } = req.body;

      const result = await authService.register(
        email,
        password,
        firstName,
        lastName,
      );

      res
        .status(201)
        .json(successResponse("User registered successfully", result, 201));
    } catch (error: unknown) {
      res
        .status(400)
        .json(
          errorResponse("Registration failed", getErrorMessage(error), 400),
        );
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Try admin login first
      try {
        const adminResult = await adminService.adminLogin(email, password);
        return res
          .status(200)
          .json(successResponse("Login successful", adminResult, 200));
      } catch (adminError) {
        // If admin login fails, try regular user login
        try {
          const userResult = await authService.login(email, password);
          return res
            .status(200)
            .json(successResponse("Login successful", userResult, 200));
        } catch (userError) {
          // Both failed
          return res
            .status(401)
            .json(
              errorResponse("Login failed", "Invalid email or password", 401),
            );
        }
      }
    } catch (error: unknown) {
      res
        .status(401)
        .json(errorResponse("Login failed", getErrorMessage(error), 401));
    }
  },

  async getProfile(req: AuthenticatedRequest, res: Response) {
    try {
      const user = await authService.getUserById(req.user!.id);

      res.status(200).json(
        successResponse("Profile retrieved", {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          country: user.country,
          affiliation: user.affiliation,
          role: user.role,
        }),
      );
    } catch (error: unknown) {
      res
        .status(404)
        .json(errorResponse("Profile not found", getErrorMessage(error), 404));
    }
  },
};
