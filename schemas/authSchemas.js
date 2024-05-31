import Joi from "joi";

export const authSignupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
