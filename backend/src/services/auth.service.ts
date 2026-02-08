import { User } from "../models/User";
import { Participant } from "../models/Participant";
import { generateToken } from "../utils/jwt";
import { IParticipant, IUser } from "../types/index";

type UserDocument = IUser & {
  comparePassword: (password: string) => Promise<boolean>;
};

export const authService = {
  async register(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const user = new User({
      email,
      password,
      firstName,
      lastName,
      role: "participant",
    });

    await user.save();

    const token = generateToken({
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    return {
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
  },

  async login(email: string, password: string) {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new Error("User not found");
    }

    const userDocument = user as UserDocument;
    const isPasswordValid = await userDocument.comparePassword(password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const token = generateToken({
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    return {
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
  },

  async getUserById(id: string) {
    const user = await User.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  },
};

export const registrationService = {
  async registerParticipant(
    userId: string | undefined,
    data: Partial<IParticipant> & {
      firstName?: string;
      middleName?: string;
      lastName?: string;
      institution?: string;
      affiliation?: string;
    },
  ) {
    const user = userId ? await User.findById(userId) : null;
    if (userId && !user) {
      throw new Error("User not found");
    }

    const fullName =
      data.fullName ||
      [data.firstName, data.middleName, data.lastName]
        .filter(Boolean)
        .join(" ")
        .trim();

    const participant = new Participant({
      userId: user?._id,
      ...data,
      fullName: fullName || data.fullName,
      affiliation: data.affiliation || data.institution,
      country: data.country,
      email: user?.email || data.email,
    });

    await participant.save();

    // Registration is initial only; admin will contact by phone.

    return participant;
  },

  async getParticipantByUserId(userId: string) {
    const participant = await Participant.findOne({ userId });
    return participant;
  },

  async updateParticipant(id: string, data: Partial<IParticipant>) {
    const participant = await Participant.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!participant) {
      throw new Error("Participant not found");
    }
    return participant;
  },
};
