import Joi from 'joi';

const imageSchema = Joi.object({
  name: Joi.string().optional(),
  img: Joi.object({
    data: Joi.binary().optional(), // Buffer type represented as binary data
    contentType: Joi.string().optional(), // MIME type for the image
  }).optional(), // `img` field is optional
});

export default imageSchema;
