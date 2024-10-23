import Joi from 'joi';

export const userSchema = Joi.object({
    userName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().min(8).max(20).required()
  });
  
  export const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(8).max(20).required()
  });