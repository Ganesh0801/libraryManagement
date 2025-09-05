const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  language: String,
  category: String,
  edition: String,
  author: String,
  publisherName: String,
  availableCopies: Number
},{
  timestamps:true
});

module.exports = mongoose.model('Book', bookSchema);
