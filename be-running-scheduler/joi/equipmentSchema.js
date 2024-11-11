import Joi from 'joi';

const equipmentSchema = Joi.object({
  owner: Joi.string().required(), // Assuming ObjectId as a string reference to User
  name: Joi.string().required(),
  type: Joi.string().required(),
  brand: Joi.string().optional(),
  model: Joi.string().optional(),
  image: Joi.string().optional(), // Assuming ObjectId as a string reference to Image
  distance: Joi.number().min(0).default(0).required(),
  inUseSince: Joi.date().default(Date.now).required(),
  time: Joi.number().min(0).default(0).required(),
  status: Joi.string().valid("active", "inactive").default("active").required(),
});

export default equipmentSchema;
