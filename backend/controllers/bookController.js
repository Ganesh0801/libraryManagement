const Book = require("../models/Book.js");

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json({ message: "Book added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateBook = async (req, res) => {
  try {
    await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: "Book updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
    getAllBooks,
    addBook,
    updateBook,
    deleteBook
}