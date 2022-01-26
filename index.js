import express from "express";
const app = express();
import { library } from "./app_modules/data.mjs";
import {
  editBook,
  getBookById,
  getLibrary,
  getLibraryTags,
  postBook,
} from "./app_modules/responses.mjs";
import { schema } from "./app_modules/schema.mjs";
import { bookID, bookTagsUrl, bookUrl } from "./app_modules/urls.mjs";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(bookUrl, (req, res) => {
  getLibrary(res, library);
});

app.get(bookTagsUrl, (req, res) => {
  const tagsArray = [];
  library.map((i) => i.tags.map((t) => tagsArray.push(t)));

  getLibraryTags(res, tagsArray);
});

app.get(bookID, (req, res) => {
  const parsedId = parseInt(req.params.id);
  const book = library.find((item) => item.id === parsedId);

  getBookById(parsedId, book, res);
});

app.post(bookUrl, (req, res) => {
  const result = schema.validate(req.body);
  const newBook = {
    id: Date.now(),
    title: req.body.title,
    author: req.body.author,
    pages: req.body.pages,
    tags: req.body.tags,
  };
  library.push(newBook);

  postBook(result, newBook, res);
});

app.put(bookID, (req, res) => {
  const parsedId = parseInt(req.params.id);
  const book = library.find((item) => item.id === parsedId);
  const result = schema.validate(req.body);

  book.title = req.body.title;
  book.author = req.body.author;
  book.pages = req.body.pages;
  book.tags = req.body.tags;

  editBook(parsedId, book, result, res);
});

app.delete(bookID, (req, res) => {
  const parsedId = parseInt(req.params.id);
  const book = library.find((item) => item.id === parsedId);
  const index = library.indexOf(book);
  library.splice(index, 1);

  getBookById(parsedId, book, res);
});

app.listen(3002, () => {
  console.log("server is running on port 3002");
});
