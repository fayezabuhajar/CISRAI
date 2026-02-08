import { Admin } from "../models/Admin";
import { IAdmin } from "../types/index";
import { generateToken } from "../utils/jwt";

type AdminDocument = IAdmin & {
  comparePassword: (password: string) => Promise<boolean>;
};

export const adminService = {
  async createAdmin(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    role: string = "admin",
  ) {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      throw new Error("Admin already exists");
    }

    const admin = new Admin({
      email,
      password,
      firstName,
      lastName,
      role,
      isActive: true,
    });

    await admin.save();
    return admin;
  },

  async adminLogin(email: string, password: string) {
    const admin = await Admin.findOne({ email, isActive: true }).select(
      "+password",
    );
    if (!admin) {
      throw new Error("Admin not found");
    }

    const adminDocument = admin as unknown as AdminDocument;
    const isPasswordValid = await adminDocument.comparePassword(password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    const token = generateToken(
      {
        id: admin._id.toString(),
        email: admin.email,
        role: admin.role,
      },
      true,
    );

    return {
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        firstName: admin.firstName,
        lastName: admin.lastName,
        role: admin.role,
      },
    };
  },

  async getAdminById(id: string) {
    const admin = await Admin.findById(id);
    if (!admin) {
      throw new Error("Admin not found");
    }
    return admin;
  },

  async getAllAdmins(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [admins, total] = await Promise.all([
      Admin.find()
        .skip(skip)
        .limit(limit)
        .select("-password")
        .sort({ createdAt: -1 }),
      Admin.countDocuments(),
    ]);

    return { admins, total, page, limit };
  },

  async updateAdmin(id: string, data: Partial<IAdmin>) {
    const admin = await Admin.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!admin) {
      throw new Error("Admin not found");
    }

    return admin;
  },

  async deactivateAdmin(id: string) {
    const admin = await Admin.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true },
    );

    if (!admin) {
      throw new Error("Admin not found");
    }

    return admin;
  },
};
