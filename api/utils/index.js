import joi from "joi";

export const schema = joi.object({
  title: joi.string().required(),
  author: joi.string().required(),
  pages: joi.number().required(),
  tags: joi.array().items(joi.string()),
});

export const bookUrl = "/book";
export const bookTagsUrl = "/book/tags";
export const bookID = "/book/:bookId";
