import mongoose from "mongoose";
const { Schema, model } = mongoose;

const imageSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true,
  },
  img: {
      data: Buffer,
      contentType: String,
  },
});

export default model("Image", imageSchema);
