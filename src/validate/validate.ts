import Joi from 'joi';

export const userSchema = Joi.object({
  id: Joi.string(),
  isDeleted: Joi.boolean(),
  login: Joi.string().required(),
  password: Joi.string()
    .regex(/\d/, '"password should contains at least one number"')
    .regex(/[A-Za-z]/, '"password should contains at least one letter"')
    .required(),
  age: Joi.number().integer().min(4).max(130).required(),
});

export const groupSchema = Joi.object({
  id: Joi.string(),
  name: Joi.string().required(),
  permissions: Joi.array().items(Joi.string().min(1)),
});
