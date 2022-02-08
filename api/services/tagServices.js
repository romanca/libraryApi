import { Books, Tags } from "../models/models.js";

const createTag = async (tagName) => {
  let getTag = await Tags.findOne({ where: { name: tagName } });

  if (!getTag) {
    getTag = await Tags.create({ name: tagName });
  }

  return getTag;
};

export const addBookTags = async (tagName, bookId) => {
  const book = await Books.findByPk(bookId);
  const tag = await createTag(tagName);

  if (book) {
    await book.addTag(tag);
  }
};

export const setBookTag = async (tags, bookId) => {
  const book = await Books.findByPk(bookId);
  const tagsArray = [];
  await tags.map((tag) => tagsArray.push(createTag(tag)));

  await book.setTags(tagsArray);
};
