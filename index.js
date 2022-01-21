const express = require("express");
const app = express();
const Joi = require("joi");

const library = [
  {
    title: "Robinson Crusoe",
    author: "Daniel Defoe",
    pages: 300,
    tags: ["adventure", "history"],
    id: 0,
  },
  {
    title: "The Unbearable Lightness of Being",
    author: "Milan Kundera",
    pages: 250,
    tags: ["philosophical", "novel"],
    id: 1,
  },
  {
    title: "Nausea",
    author: "Jean-Paul Sartre",
    pages: 120,
    tags: ["philosophical", "existentialism", "novel"],
    id: 2,
  },
];

function validateBook(book) {
  const schema = {
    title: Joi.string().required(),
    author: Joi.string().required(),
    pages: Joi.number().required(),
    tags: joi.array().items(joi.string()),
  };
  return Joi.validate(book, schema);
}

app.get("/book", (req, res) => {
  res.status(200).send(["successfull operation", library]);
});

app.get("/book/tags", (req, res) => {
  const tags = library.map((element) => element.tags);
  if (!tags) {
    return res.status(404).send("The are no tags...!!!");
  } else {
    return res.status(200).send(["successfull operation", tags]);
  }
});

app.get("/book/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const book = library.find((item) => item.id === id);
  if (!book) {
    return res.status(404).send("Book not found");
  } else if (book) {
    res.status(200).send(["successful operation", book]);
  }
});

app.post("/book", (req, res) => {
  const { error } = validateBook(req.body);
  if (error) return res.status(400).send(error.details.message);
  const newBook = {
    id: Date.now(),
    title: req.body.title,
    author: req.body.author,
    pages: req.body.pages,
    tags: req.body.tags,
  };
  library.push(newBook);
  res.send(newBook);
});

app.put("/book/:id", (req, res) => {
  const book = library.find((item) => item.id === parseInt(req.params.id));
  const { error } = validateBook(req.body);
  if (error) return res.status(400).send(error.details.message);

  book.title = req.body.title;
  book.author = req.body.author;
  book.pages = req.body.pages;
  book.tags = req.body.tags;
  res.send(book);
});

app.delete("/book/:id", (req, res) => {
  const book = library.find((item) => item.id === parseInt(req.params.id));
  if (!book) {
    return res.status(404).send("The book with this id does not exist...!!!");
  }
  const index = library.indexOf(book);
  library.splice(index, 1);
  res.status(200).send("successfull operation", book);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3002, () => {
  console.log("server is running on port 3002");
});
