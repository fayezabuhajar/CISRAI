import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../middleware/auth";
import { adminService } from "../services/admin.service";

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
};

export const adminController = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, firstName, lastName } = req.body;

      // Validate required fields
      if (!email || !password || !firstName || !lastName) {
        res.status(400).json({
          success: false,
          message: "All fields are required",
        });
        return;
      }

      // Create admin
      const admin = await adminService.createAdmin(
        email,
        password,
        firstName,
        lastName,
      );

      // Remove password from response
      const adminData = {
        _id: admin._id,
        email: admin.email,
        firstName: admin.firstName,
        lastName: admin.lastName,
        role: admin.role,
        isActive: admin.isActive,
        createdAt: admin.createdAt,
      };

      res.status(201).json({
        success: true,
        message: "Admin created successfully",
        data: adminData,
      });
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      if (message.includes("already exists")) {
        res.status(409).json({
          success: false,
          message: "Admin with this email already exists",
        });
        return;
      }
      next(error);
    }
  },

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      // Validate required fields
      if (!email || !password) {
        res.status(400).json({
          success: false,
          message: "Email and password are required",
        });
        return;
      }

      // Authenticate admin
      const result = await adminService.adminLogin(email, password);

      res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
          admin: result.admin,
          token: result.token,
        },
      });
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      if (message.includes("not found") || message.includes("Invalid")) {
        res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
        return;
      }
      next(error);
    }
  },

  async getAllAdmins(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const result = await adminService.getAllAdmins(page, limit);
      res.status(200).json({
        success: true,
        message: "Admins retrieved successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  async getProfile(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const adminId = req.user?.id;

      if (!adminId) {
        res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
        return;
      }

      const admin = await adminService.getAdminById(adminId);

      if (!admin) {
        res.status(404).json({
          success: false,
          message: "Admin not found",
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Profile retrieved successfully",
        data: {
          _id: admin._id,
          email: admin.email,
          firstName: admin.firstName,
          lastName: admin.lastName,
          role: admin.role,
          isActive: admin.isActive,
          createdAt: admin.createdAt,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).json({
        success: true,
        message: "Logout successful",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  },
};
