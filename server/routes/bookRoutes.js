const express = require("express");
const router = express.Router();
const {
  getAllBooks,
  addBook,
  deleteBook,
  updateBook,
} = require("../controllers/bookController.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

router.use(authMiddleware);

router.get("/", getAllBooks);
router.post("/", addBook);
router.delete("/:id", deleteBook);
router.put("/:id", updateBook);

module.exports = router;
