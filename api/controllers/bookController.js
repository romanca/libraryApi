import { Tags, Books } from "../models/models.js";
import { addBookTags, setBookTag } from "../services/tagServices.js";
import { schema } from "../utils/index.js";

export const getBookById = async (req, res) => {
  if (req.params.bookId.match(/^\d+$/g) !== null) {
    const book = await Books.findByPk(parseInt(req.params.bookId), {
      include: [{ model: Tags, as: "tags" }],
    });

    if (book) res.send(book);
    else res.status(404).send("Book not found...!!!");
  } else {
    res.status(400).send("Invalid ID format supplied");
  }
};

export const updateBook = async (req, res) => {
  if (req.params.bookId.match(/^\d+$/g)) {
    const book = await Books.findByPk(parseInt(req.params.bookId), {
      include: [{ model: Tags, as: "tags" }],
    });

    if (book) {
      if (!schema.validate(req.body).error) {
        book.title = req.body.title;
        book.author = req.body.author;
        book.pages = req.body.pages;
        await setBookTag(req.body.tags, book.id);
        await book.save();
        await book.reload();

        res.send(book);
      } else {
        res.status(405).send("New book was not validated");
      }
    } else {
      res.status(404).send();
    }
  } else {
    res.status(400).send("Invalid ID format supplied");
  }
};

export const deleteBook = async (req, res) => {
  if (req.params.bookId.match(/^\d+$/g)) {
    const book = await Books.findByPk(parseInt(req.params.bookId), {
      include: [{ model: Tags, as: "tags" }],
    });

    if (book) {
      await book.destroy();
      res.send(book);
    } else res.status(404).send("Book not found");
  } else {
    res.status(400).send("Invalid ID format supplied");
  }
};

export const createBook = async (req, res) => {
  if (!schema.validate(req.body).error) {
    const book = await Books.create(
      {
        title: req.body.title,
        author: req.body.author,
        pages: req.body.pages,
      },
      { include: [{ model: Tags, as: "tags" }] }
    );
    for (const tag of req.body.tags) await addBookTags(tag, book.id);
    await book.reload();
    res.send(book);
  } else {
    res.status(405).send("Method not allowed....!!!");
  }
};

export const getBookLibrary = async (req, res) => {
  const books = await Books.findAll({
    include: [{ model: Tags, as: "tags" }],
  });
  const library = [];
  await books.map((book) => library.push(book));
  res.send(library);
};

export const getBookTags = async (req, res) => {
  const tags = await Tags.findAll();
  const tagsListArray = [];
  await tags.map((tag) => tagsListArray.push(tag));
  res.send(tagsListArray);
};
