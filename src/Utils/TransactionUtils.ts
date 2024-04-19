import * as Joi from "joi";

export const addTransaction = Joi.object({
  amount: Joi.number().required(),
  category: Joi.string().required(),
  date: Joi.date().required(),
  note: Joi.string().required(),
});

export const updateTransaction = Joi.object({
  amount: Joi.number().required(),
  category: Joi.string().required(),
  date: Joi.date().required(),
  note: Joi.string().required(),
  transactionId: Joi.string().required(),
});
