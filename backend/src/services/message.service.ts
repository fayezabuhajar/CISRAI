import { Message } from "../models/Message";
import { IMessage } from "../types/index";

export const messageService = {
  async submitMessage(data: Partial<IMessage>) {
    const message = new Message({
      ...data,
      status: "unread",
    });

    await message.save();
    return message;
  },

  async getAllMessages(page: number, limit: number, status?: string) {
    const skip = (page - 1) * limit;
    const query = status ? { status } : {};

    const [messages, total] = await Promise.all([
      Message.find(query).skip(skip).limit(limit).sort({ createdAt: -1 }),
      Message.countDocuments(query),
    ]);

    return { messages, total, page, limit };
  },

  async getMessageById(id: string) {
    const message = await Message.findById(id);
    if (!message) {
      throw new Error("Message not found");
    }
    return message;
  },

  async markAsRead(id: string) {
    const message = await Message.findByIdAndUpdate(
      id,
      { status: "read" },
      { new: true },
    );

    if (!message) {
      throw new Error("Message not found");
    }

    return message;
  },

  async replyToMessage(id: string, response: string, respondedBy: string) {
    const message = await Message.findByIdAndUpdate(
      id,
      {
        response,
        respondedBy,
        respondedAt: new Date(),
        status: "replied",
      },
      { new: true },
    );

    if (!message) {
      throw new Error("Message not found");
    }

    return message;
  },

  async deleteMessage(id: string) {
    const message = await Message.findByIdAndDelete(id);
    if (!message) {
      throw new Error("Message not found");
    }
    return message;
  },
};
