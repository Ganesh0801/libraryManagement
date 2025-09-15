const express = require("express");
const router = express.Router();
const {
  getAllBooks,
  addBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController.js");
const authMiddleware = require("../middlewares/authMiddleware.js");
const {validateBook} = require("../middlewares/bookValidate.js");

router.use(authMiddleware);

router.get("/", getAllBooks);
router.post("/", validateBook,addBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

module.exports = router;
