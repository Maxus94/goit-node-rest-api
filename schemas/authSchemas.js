import Joi from "joi";

export const authSignupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const authEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const subscribeSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});
