import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IMessage extends Document {
  name: string;
  email: string;
  subject?: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    subject: { type: String, trim: true, default: "" },
    message: { type: String, required: true, trim: true },
    read: { type: Boolean, default: false },
  },
  {
    timestamps: true, // adds createdAt + updatedAt automatically
  }
);

// Prevent model re-compilation during Next.js hot-reload
const Message = models.Message || model<IMessage>("Message", MessageSchema);

export default Message;
