import express from "express";
import {
  borrowBooks,
  getBorrowedBooksForAdmin,
  recordBorrowedBook,
  returnBorrowBook,
} from "../controllers/borrowController.js";
import { isAuthenticated, isAuthorized } from "../middlewares/authMiddleware";
const router = express.Router();

router.post(
  "/record-borrow-book/:id",
  isAuthenticated,
  isAuthorized("Admin"),
  recordBorrowedBook
);
router.get(
  "/borrowed-books-by-users",
  isAuthenticated,
  isAuthorized("Admin"),
  getBorrowedBooksForAdmin
);
router.get("/my-borrowed-books", isAuthenticated, borrowBooks);
router.put(
  "/return-borrowed-book/:bookId",
  isAuthenticated,
  isAuthorized("Admin"),
  returnBorrowBook
);

export default router;
