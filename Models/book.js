const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: String,
  isbn: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;

