import mongoose from "mongoose";
const { Schema, model } = mongoose;

const imageSchema = new mongoose.Schema({
  userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
  },
  name: {
      type: String,
      required: true,
  },
  img: {
      data: Buffer,
      contentType: String,
  },
  Date: {
      type: Date,
      default: Date.now,
  },
});

export default model("Image", imageSchema);
