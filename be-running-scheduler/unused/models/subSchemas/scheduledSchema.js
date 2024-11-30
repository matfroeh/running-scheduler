import mongoose from "mongoose";
const { Schema, model } = mongoose;

const scheduledSchema = new Schema({
    date: {
      type: Date,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    distance: {
      type: Number,
    },
    duration: {
      type: Number,
    },
    description: {
      type: String,
      text: true,
    },
  });
  

  export default model("Scheduled", scheduledSchema);