import * as Joi from "joi";

export const addCategory = Joi.object({
  imageCategory: Joi.string(),
  nameCategory: Joi.string().required(),
  type: Joi.string().required(),
});
