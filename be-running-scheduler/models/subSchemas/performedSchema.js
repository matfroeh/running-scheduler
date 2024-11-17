import mongoose from "mongoose";
const { Schema, model } = mongoose;

const performedSchema = new Schema({
    date: {
      type: Date,
      required: true,
    },
    name: {
      // this is the name from the gpx (track)-metadata
      type: String,
    },
    type: {
      // the user can select from a list of types in the edit form of the frontend
      type: String,
    },
    distance: {
      type: Number,
    },
    // Duration = Activity Time (ToDO: name change to activityTime)
    duration: {
      type: Number,
    },
    totalTime: {
      type: Number,
    },
    tempo: {
      type: Number,
    },
    speed: {
      type: Number,
    },
    timeArray: {
      // used to plot a time-velocity-diagram
      type: [Number],
    },
    velocityArray: {
      // used to plot a time-velocity-diagram
      type: [Number],
    },
    effort: {
      type: Number,
    },
    avg_hr: {
      type: Number,
    },
    comments: {
      type: String,
      text: true,
    },
    equipment: {
      // this is the equipment used for this run. It will be stored as a String and not as the equipment object ID
      // because the equipment should be still in the equipment list even if it is deleted completely from the database.
      type: String,
    },
  });

  export default model("Performed", performedSchema);