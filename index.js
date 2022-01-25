import express from "express";
const app = express();
import Joi from "joi";
import { library } from "./data.mjs";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const schema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  pages: Joi.number().optional(),
  tags: Joi.array().items(Joi.string()).optional(),
});

app.get("/book", (req, res) => {
  res.status(200).send(library);
});

app.get("/book/tags", (req, res) => {
  const tagsArray = [];
  library.map((i) => i.tags.map((t) => tagsArray.push(t)));

  if (!tagsArray) {
    return res.status(404).send("The are no tags...!!!");
  } else {
    return res.status(200).send(tagsArray);
  }
});

app.get("/book/:id", (req, res) => {
  const parsedId = parseInt(req.params.id);
  const book = library.find((item) => item.id === parsedId);

  if (isNaN(parsedId)) {
    return res.status(400).send("Invalid ID format supplied");
  } else if (!book) {
    return res.status(404).send("Book not found");
  } else {
    return res.status(200).send(book);
  }
});

app.post("/book", (req, res) => {
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
});

app.put("/book/:id", (req, res) => {
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
});

app.delete("/book/:id", (req, res) => {
  const parsedId = parseInt(req.params.id);
  const book = library.find((item) => item.id === parsedId);
  const index = library.indexOf(book);
  library.splice(index, 1);

  if (isNaN(parsedId)) {
    return res.status(400).send("Invalid ID format supplied");
  } else if (!book) {
    return res.status(404).send("The book with this id does not exist...!!!");
  } else {
    return res.status(200).send(book);
  }
});

app.listen(3002, () => {
  console.log("server is running on port 3002");
});
