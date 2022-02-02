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
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

router
  .get(bookUrl, getLibrary)
  .get(bookID, getBookById)
  .post(bookUrl, postBook)
  .put(bookID, editBook)
  .delete(bookID, deleteBook);
// .post(bookTagsUrl, getLibraryTags);
// .get(bookTagsUrl, getLibraryTags);

app.use(router);

app.listen(3002, () => {
  console.log("server is running on port 3002");
});
