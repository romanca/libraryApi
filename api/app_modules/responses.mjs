import { library } from "./data.mjs";
import { schema } from "./schema.mjs";

export function getLibrary(req, res) {
  return res.status(200).send(library);
}

export function getLibraryTags(req, res) {
  const tagsArray = [];
  library.map((i) => i.tags.map((t) => tagsArray.push(t)));

  if (!tagsArray) {
    return res.status(404).send("The are no tags...!!!");
  } else {
    return res.status(200).send(tagsArray);
  }
}

export function getBookById(req, res) {
  const parsedId = parseInt(req.params.id);
  const book = library.find((item) => item.id === parsedId);

  if (isNaN(parsedId)) {
    return res.status(400).send("Invalid ID format supplied");
  } else if (!book) {
    return res.status(404).send("Book not found");
  } else {
    return res.status(200).send(book);
  }
}

export function postBook(req, res) {
  const result = schema.validate(req.body);
  const newBook = {
    id: Date.now(),
    title: req.body.title,
    author: req.body.author,
    pages: req.body.pages,
    tags: req.body.tags,
  };
  library.push(newBook);

  if (result.error) {
    return res.status(405).send("New book was not validated");
  } else {
    return res.status(200).send(newBook);
  }
}

export function editBook(req, res) {
  const parsedId = parseInt(req.params.id);
  const book = library.find((item) => item.id === parsedId);
  const result = schema.validate(req.body);

  book.title = req.body.title;
  book.author = req.body.author;
  book.pages = req.body.pages;
  book.tags = req.body.tags;

  if (isNaN(parsedId)) {
    return res.status(400).send("Invalid ID format supplied");
  } else if (result.error) {
    return res.status(405).send("New book was not validated");
  } else {
    return res.status(200).send(book);
  }
}

export function deleteBook(req, res) {
  const parsedId = parseInt(req.params.id);
  const book = library.find((item) => item.id === parsedId);
  const index = library.indexOf(book);
  library.slice(index, 1);

  if (isNaN(parsedId)) {
    return res.status(400).send("Invalid ID format supplied");
  } else if (!book) {
    return res.status(404).send("Book not found");
  } else {
    return res.status(200).send(book);
  }
}
