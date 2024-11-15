import mongoose from "mongoose";
const { Schema, model } = mongoose;

const daySchema = new Schema({
  date: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        const days = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        return this.dayOfWeek === days[new Date(value).getDay()];
      },
      message: "The date does not match the day of the week.",
    },
  },
  dayOfWeek: {
    type: String,
    enum: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    required: true,
  },
  scheduled: {
    type: [{ type: Schema.Types.ObjectId, ref: "Scheduled" }],
    default: [],
  },
  performed: {
    type: [{ type: Schema.Types.ObjectId, ref: "Performed" }],
    default: [],
  },
});

const weekSchema = new Schema({
  weekNumber: {
    type: Number,
    required: true,
    min: 1,
    max: 53,
  },
  days: {
    type: [daySchema], // Array of days in a week, will contain data for each day of both scheduled trainings and performed runs
    default: [],
  },
});

const journalSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
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
      type: [weekSchema], // Array of weeks
      default: [],
    },
  },
  { timestamps: true }
);

journalSchema.index({ user: 1, startDate: 1 }, { unique: true });

export default model("Journal", journalSchema);

// const performedSchema = new Schema({
//   date: {
//     type: Date,
//     required: true,
//   },
//   name: {
//     // this is the name from the gpx (track)-metadata
//     type: String,
//   },
//   type: {
//     // the user can select from a list of types in the edit form of the frontend
//     type: String,
//   },
//   distance: {
//     type: Number,
//   },
//   // Duration = Activity Time (ToDO: name change to activityTime)
//   duration: {
//     type: Number,
//   },
//   totalTime: {
//     type: Number,
//   },
//   tempo: {
//     type: Number,
//   },
//   speed: {
//     type: Number,
//   },
//   timeArray: {
//     // used to plot a time-velocity-diagram
//     type: [Number],
//   },
//   velocityArray: {
//     // used to plot a time-velocity-diagram
//     type: [Number],
//   },
//   effort: {
//     type: Number,
//   },
//   avg_hr: {
//     type: Number,
//   },
//   comments: {
//     type: String,
//     text: true,
//   },
//   equipment: {
//     // this is the equipment used for this run. It will be stored as a String and not as the equipment object ID
//     // because the equipment should be still in the equipment list even if it is deleted completely from the database.
//     type: String,
//   },
// });

// const scheduledSchema = new Schema({
//   date: {
//     type: Date,
//     required: true,
//   },
//   type: {
//     type: String,
//     required: true,
//   },
//   distance: {
//     type: Number,
//   },
//   duration: {
//     type: Number,
//   },
//   description: {
//     type: String,
//     text: true,
//   },
// });
