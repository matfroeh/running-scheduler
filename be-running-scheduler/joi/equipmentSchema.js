import Joi from 'joi';

const equipmentSchema = Joi.object({
  _id: Joi.string().optional(),
  owner: Joi.string().optional(), // ObjectId of user
  name: Joi.string().required(),
  type: Joi.string().required(),
  brand: Joi.string().allow("").optional(),
  model: Joi.string().allow("").optional(),
  image: Joi.string().allow(null).optional(), // Assuming ObjectId as a string reference to Image
  distance: Joi.number().min(0).default(0).required(),
  inUseSince: Joi.date().default(Date.now).required(),
  time: Joi.number().min(0).default(0).required(),
  status: Joi.string().valid("active", "inactive").default("active").required(),
  description: Joi.string().allow("").optional(),
  createdAt: Joi.date().default(Date.now),
  updatedAt: Joi.date().default(Date.now),
  __v: Joi.number().optional(),
});

export default equipmentSchema;
