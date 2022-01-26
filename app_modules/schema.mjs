import Joi from "joi";

export const schema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  pages: Joi.number().optional(),
  tags: Joi.array().items(Joi.string()).optional(),
});
