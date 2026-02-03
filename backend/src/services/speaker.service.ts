import { Speaker } from "../models/Speaker";

export const speakerService = {
  async createSpeaker(data: any) {
    const existingSpeaker = await Speaker.findOne({ email: data.email });
    if (existingSpeaker) {
      throw new Error("Speaker already exists");
    }

    const speaker = new Speaker({
      ...data,
      status: "invited",
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

  async updateSpeaker(id: string, data: any) {
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
      { status: "confirmed" },
      { new: true },
    );

    if (!speaker) {
      throw new Error("Speaker not found");
    }

    return speaker;
  },
};
