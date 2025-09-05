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
    const {
      title,
      language,
      category,
      edition,
      author,
      publisherName,
      availableCopies,
    } = req.body;
    const newBook = new Book({
      title,
      language,
      category,
      edition,
      author,
      publisherName,
      availableCopies,
    });
    await newBook.save();
    res.status(201).json({ message: "Book added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    await Book.findByIdAndDelete(id);
    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    await Book.findByIdAndUpdate(id, updateData, { new: true });
    res.json({ message: "Book updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllBooks, addBook, deleteBook, updateBook };
