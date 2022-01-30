import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
const app = express();
import {
  editBook,
  getBookById,
  getLibrary,
  getLibraryTags,
  postBook,
  deleteBook,
} from "./app_modules/responses.mjs";
import { bookID, bookTagsUrl, bookUrl } from "./app_modules/urls.mjs";

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.get(bookUrl, getLibrary);

app.get(bookTagsUrl, getLibraryTags);

app.get(bookID, getBookById);

app.post(bookUrl, postBook);

app.put(bookID, editBook);

app.delete(bookID, deleteBook);

app.listen(3002, () => {
  console.log("server is running on port 3002");
});
