import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  requesterId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  bloodGroup: String,
  location: String,
  message: String,
  status: { type: String, default: "Pending" },
});

export default mongoose.model("Request", requestSchema);
