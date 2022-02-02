import Books from "../models/books.mjs";
import sequelize from "../models/index.mjs";
import Tags from "../models/tags.mjs";
import { schema } from "./schema.mjs";

sequelize.sync({ force: true }).then(() => console.log("db is ready"));

export const getLibrary = async (req, res) => {
  const books = await Books.findAll();
  res.send(books);
};

export const getLibraryTags = async (req, res) => {
  const { name, id } = req.body;
  // const parsedId = parseInt(req.params.id);
  const book = await Books.findByPk({ where: { id: id } });
  console.log(book);
  const tag = await Tags.create({ name, bookId: book.id });
  res.send(tag);
  // const tagsArray = [];
  // library.map((i) => i.tags.map((t) => tagsArray.push(t)));
  // if (!tagsArray) {
  //   return res.status(404).send("The are no tags...!!!");
  // } else {
  //   return res.status(200).send(tagsArray);
  // }
};
// export function getLibraryTags(req, res) {
//   const tagsArray = [];
//   library.map((i) => i.tags.map((t) => tagsArray.push(t)));

//   if (!tagsArray) {
//     return res.status(404).send("The are no tags...!!!");
//   } else {
//     return res.status(200).send(tagsArray);
//   }
// }

export const getBookById = async (req, res) => {
  const parsedId = parseInt(req.params.id);
  const book = await Books.findOne({ where: { id: parsedId } });

  if (isNaN(parsedId)) {
    return res.status(400).send("Invalid ID format supplied");
  } else if (!book) {
    return res.status(404).send("Book not found");
  } else {
    return res.status(200).send(book);
  }
};

export const postBook = async (req, res) => {
  const result = schema.validate(req.body);
  const newBook = {
    title: req.body.title,
    author: req.body.author,
    pages: req.body.pages,
    tags: req.body.tags,
  };
  await Books.create(newBook);

  if (result.error) {
    return res.status(405).send("New book was not validated");
  } else {
    return res.status(200).send("Book created");
  }
};

export const editBook = async (req, res) => {
  const parsedId = parseInt(req.params.id);
  const book = await Books.findOne({ where: { id: parsedId } });
  const result = schema.validate(req.body);

  book.title = req.body.title;
  book.author = req.body.author;
  book.pages = req.body.pages;
  book.tags = req.body.tags;

  await book.save();

  if (isNaN(parsedId)) {
    return res.status(400).send("Invalid ID format supplied");
  } else if (result.error) {
    return res.status(405).send("New book was not validated");
  } else {
    return res.status(200).send("Successfully updated");
  }
};

export const deleteBook = async (req, res) => {
  const parsedId = parseInt(req.params.id);
  await Books.destroy({ where: { id: parsedId } });

  if (isNaN(parsedId)) {
    return res.status(400).send("Invalid ID format supplied");
  } else if (!parsedId) {
    return res.status(404).send("Book not found");
  } else {
    return res.status(200).send("Successfully removed");
  }
};
