import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
  name: String,
  members: [String],
  admin: String
});

export default mongoose.model("Group", groupSchema);