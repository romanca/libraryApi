import express from "express";
import {
  getBookLibrary,
  createBook,
  deleteBook,
  getBookById,
  getBookTags,
  updateBook,
} from "../controllers/bookController.js";
import { bookID, bookTagsUrl, bookUrl } from "../utils/index.js";

const router = express.Router();
router.use(express.json());

router
  .get(bookUrl, getBookLibrary)
  .post(bookUrl, createBook)
  .get(bookTagsUrl, getBookTags)
  .get(bookID, getBookById)
  .put(bookID, updateBook)
  .delete(bookID, deleteBook);

export default router;
