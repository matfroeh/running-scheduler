import Joi from "joi";

const daySchema = Joi.object({
  _id: Joi.string().optional(),
  date: Joi.date().required(),
  name: Joi.string().optional(),
  type: Joi.string().optional(),
  distance: Joi.number().allow("").allow(null).optional(),
  duration: Joi.number().optional(), // renamed to activityTime if needed
  totalTime: Joi.number().optional(),
  tempo: Joi.number().optional(),
  speed: Joi.number().optional(),
  timeArray: Joi.array().items(Joi.number()).optional(),
  velocityArray: Joi.array().items(Joi.number()).optional(),
  effort: Joi.number().optional().allow(null).allow(""),
  avg_hr: Joi.number().allow(null).allow("").optional(),
  comments: Joi.string().allow("").optional(),
  equipment: Joi.string().allow("").optional(),
});

const weekSchema = Joi.object({
  _id: Joi.string().optional(),
  days: Joi.object().pattern(Joi.string().regex(/^day\d+$/), daySchema),
});

const runsSchema = Joi.object({
  _id: Joi.string().optional(),
  user: Joi.string().optional(), // Also assuming ObjectId as a string for the user reference
  meta: Joi.object({
    title: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    weeks: Joi.number().required(),
  }),
  weeks: Joi.object()
    .pattern(Joi.string().regex(/^week\d+$/), weekSchema)
    .required(), // Maps weeks keys like week1, week2, etc.
  createdAt: Joi.date().default(Date.now),
  updatedAt: Joi.date().default(Date.now),
  __v: Joi.number().optional(),
});

export default runsSchema;
