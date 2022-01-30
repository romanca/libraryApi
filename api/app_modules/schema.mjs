import joi from "joi";

export const schema = joi.object({
  title: joi.string().required(),
  author: joi.string().required(),
  pages: joi.number().optional(),
  tags: joi.array().items(joi.string()).optional(),
});
