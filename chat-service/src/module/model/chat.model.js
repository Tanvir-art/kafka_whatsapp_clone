import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: String,
    receiverId: String,
    conversationId: String,
    text: String,
    status: {
      type: String,
      enum: ["sent", "delivered", "read"],
      default: "sent"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);
