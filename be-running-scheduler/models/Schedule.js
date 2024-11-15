import mongoose from "mongoose";
const { Schema, model } = mongoose;

const daySchema = new Schema({
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
  description: { // this will be used for the user describing e.g. the workout protocol for that day
    type: String,
    text: true,
  },
  
});

const weekSchema = new Schema({
  days: {
    type: Map,
    of: daySchema,
  },
}, { _id: true } ); 
const scheduleSchema = new Schema(
  {
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
      weeks: { // Number of total weeks
        type: Number,
      },
    },
    weeks: {
      type: Map,
      of: weekSchema, // Dynamic key
      default: {},
    },
  },
  { timestamps: true }
);

export default model("Schedule", scheduleSchema);

// const daySchema = new Schema({
//   _id: false, // Prevents Mongoose from auto-generating an _id for each day
//   dayOfWeek: {
//     type: String,
//     enum: [
//       "Monday",
//       "Tuesday",
//       "Wednesday",
//       "Thursday",
//       "Friday",
//       "Saturday",
//       "Sunday",
//     ],
//     required: true,
//   },
//   activities: {
//     type: [String], // Array of activity descriptions
//     default: [],
//   },
//   notes: {
//     type: String,
//     default: "",
//   },
// });

// const weekSchema = new Schema({
//   _id: {
//     type: String,
//     default: () => new mongoose.Types.ObjectId().toString(), // Custom ID for the week
//   },
//   weekNumber: {
//     type: Number,
//     required: true,
//   },
//   description: {
//     type: String,
//     default: "",
//   },
//   status: {
//     type: String,
//     enum: ["planned", "in-progress", "completed"],
//     default: "planned",
//   },
//   days: {
//     type: [daySchema], // Array of day objects
//     default: [],
//   },
// });

// const scheduleSchema = new Schema(
//   {
//     meta: {
//       title: {
//         type: String,
//         required: [true, "Title is required"],
//       },
//       startDate: {
//         type: Date,
//         required: [true, "Start date is required"],
//       },
//     },
//     weeks: {
//       type: [weekSchema], // Array of week objects with more nested properties
//       default: [],
//     },
//   },
//   { timestamps: true } // Adds createdAt and updatedAt fields automatically
// );

// module.exports = mongoose.model("Schedule", scheduleSchema);
