import Joi from 'joi';

export const userSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string()
    .regex(/\d/, '"password should contains at least one number"')
    .regex(/[A-Za-z]/, '"assword should contains at least one letter"')
    .required(),
  age: Joi.number().integer().min(4).max(130).required(),
});
