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

// const daysSchema = new Schema({
//   day: {
//     type: String,
//     required: [true, "Day number is required"],
//   },
//   type: {
//     type: String,
//     required: [true, "Day type is required"],
//   },
// });

// const weeksSchema = new Schema({
//   //   name: {
//   //     type: String,
//   //     required: [true, "Week+Number week# is required"],
//   //   },

//   days: [daysSchema],
// });

// const scheduleSchema = new Schema({
//   meta: {
//     // Nested Path => object has no own ID? I get different answers, needs to be tested...
//     title: {
//       type: String,
//       required: [true, "Title is required"],
//     },
//     startDate: {
//       type: Date,
//       required: [true, "Start date is required"],
//     },
//   },
//   weeks: [weeksSchema],
// });

// const scheduleSchema = new Schema({
//   meta: {
//     title: {
//       type: String,
//       required: [true, "Title is required"],
//     },
//     startDate: {
//       type: Date,
//       required: [true, "Start date is required"],
//     },
//   },
//   weeks: {
//     type: Object,
//   },
// });
