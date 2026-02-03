import { User } from "../models/User";
import { Participant } from "../models/Participant";
import { generateToken } from "../utils/jwt";
import { sendRegistrationEmail } from "../utils/email";

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

    const isPasswordValid = await (user as any).comparePassword(password);
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
  async registerParticipant(userId: string, data: any) {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const participant = new Participant({
      userId,
      ...data,
      email: user.email,
    });

    await participant.save();
    await sendRegistrationEmail(
      user.email,
      user.firstName,
      data.registrationType,
    );

    return participant;
  },

  async getParticipantByUserId(userId: string) {
    const participant = await Participant.findOne({ userId });
    return participant;
  },

  async updateParticipant(id: string, data: any) {
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
