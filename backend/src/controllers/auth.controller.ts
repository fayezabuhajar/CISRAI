import { Request, Response } from "express";
import { authService } from "../services/auth.service";
import { successResponse, errorResponse } from "../utils/response";

interface AuthenticatedRequest extends Request {
  user?: { id: string; email: string; role: string };
}

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
    } catch (error: any) {
      res
        .status(400)
        .json(errorResponse("Registration failed", error.message, 400));
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const result = await authService.login(email, password);

      res.status(200).json(successResponse("Login successful", result, 200));
    } catch (error: any) {
      res.status(401).json(errorResponse("Login failed", error.message, 401));
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
    } catch (error: any) {
      res
        .status(404)
        .json(errorResponse("Profile not found", error.message, 404));
    }
  },
};
