import mongoose from "mongoose";
const { Schema, model } = mongoose;

const daySchema = new Schema({
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
    // CHANGED NOW TO NUMBER (old: saved as hh:mm:ss)
    type: Number,
  },
  totalTime: {
    type: Number,
  },
  tempo: {
    // CHANGED NOW TO NUMBER (old saved as min/km in mm:ss/km format)
    type: Number,
  },
  speed: {
    // CHANGED NOW TO NUMBER ( old: saved as km/h)
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
    // this is the equipment used for this run: ToDo: explain why I am not using the equipmentId
    type: String,
  },
});

const weekSchema = new Schema(
  {
    days: {
      type: Map,
      of: daySchema,
    },
  },
  { _id: true }
); // ToDo: set to false if it is not used later

const runsSchema = new Schema(
  {
    _id: { type: Schema.ObjectId, required: true },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },

    meta: {
      title: {
        type: String,
        required: [true, "Title is required"],
      },
      startDate: {
        type: Date,
        required: [true, "Start date is required"],
      },
      endDate: {
        type: Date,
        required: [true, "End date is required"],
      },
      weeks: {
        // Number of weeks
        type: Number,
      },
    },
    weeks: {
      type: Map,
      of: weekSchema, // Dynamic key
      default: {},
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { _id: false },

  { timestamps: true }
);

runsSchema.index({ "$**": "text" });

export default model("Runs", runsSchema);
