import mongoose from "mongoose";
const { Schema, model } = mongoose;

const daySchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  name: { // this is the name from the gpx (track)-metadata
    type: String,
  },
  type: { // maybe the user can select from a list of types in the edit form of the frontend
    type: String,
  },
  distance: {
    type: Number,
  },
  duration: {
    // because we will save it as hh:mm:ss
    type: String,
  },
  tempo: { // will be saved as min/km in mm:ss/km format
    type: String,
  },
  speed: { // will be saved as km/h, could be saved as number but we will use string for now
    type: String,
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
    // ToDo: we will late create an equipment schema and use a reference here
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
    _id: {type: Schema.ObjectId, required: true},
    // _id: { type: String , required: true },

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

export default model("Runs", runsSchema);
