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
journalSchema.pre("save", function (next) {
  if (this.startDate >= this.endDate) {
    next(new Error("End date must be after start date"));
  }
  next();
});

export default model("Journal", journalSchema);