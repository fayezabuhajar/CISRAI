import { Speaker } from "../models/Speaker";
import { ISpeaker } from "../types/index";

export const speakerService = {
  async createSpeaker(data: Partial<ISpeaker>) {
    // Only check for existing speaker if email is provided
    if (data.email) {
      const existingSpeaker = await Speaker.findOne({ email: data.email });
      if (existingSpeaker) {
        throw new Error("Speaker already exists");
      }
    }

    const speaker = new Speaker({
      ...data,
      status: data.status || "active",
    });

    await speaker.save();
    return speaker;
  },

  async getAllSpeakers(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [speakers, total] = await Promise.all([
      Speaker.find().skip(skip).limit(limit),
      Speaker.countDocuments(),
    ]);

    return { speakers, total, page, limit };
  },

  async getSpeakerById(id: string) {
    const speaker = await Speaker.findById(id);
    if (!speaker) {
      throw new Error("Speaker not found");
    }
    return speaker;
  },

  async updateSpeaker(id: string, data: Partial<ISpeaker>) {
    const speaker = await Speaker.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!speaker) {
      throw new Error("Speaker not found");
    }

    return speaker;
  },

  async deleteSpeaker(id: string) {
    const speaker = await Speaker.findByIdAndDelete(id);
    if (!speaker) {
      throw new Error("Speaker not found");
    }
    return speaker;
  },

  async confirmSpeaker(id: string) {
    const speaker = await Speaker.findByIdAndUpdate(
      id,
      { status: "active" },
      { new: true },
    );

    if (!speaker) {
      throw new Error("Speaker not found");
    }

    return speaker;
  },
};
