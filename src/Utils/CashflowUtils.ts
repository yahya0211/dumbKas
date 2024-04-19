import * as Joi from "joi";

export const findById = Joi.object({
  inflow: Joi.number().required(),
  outflow: Joi.number().required(),
  balance: Joi.number().required(),
});

export const addInflow = Joi.object({
  inflow: Joi.number().required(),
  outflow: Joi.number().required(),
  balance: Joi.number().required(),
});

export const calculateCashFlow = Joi.object({
  inflow: Joi.number().required(),
  outflow: Joi.number().required(),
  balance: Joi.number().required(),
});
