const express = require('express');
const router = express.Router();
const Book = require('../Models/book');

// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find().populate('author');
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get book by ID
router.get('/:id', getBook, (req, res) => {
  res.json(res.book);
});

// Create new book
router.post('/', async (req, res) => {
  const book = new Book({
    title: req.body.title,
    summary: req.body.summary,
    isbn: req.body.isbn,
    author: req.body.author
  });

  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update book details
router.put('/:id', getBook, async (req, res) => {
  if (req.body.title != null) {
    res.book.title = req.body.title;
  }
  if (req.body.summary != null) {
    res.book.summary = req.body.summary;
  }
  if (req.body.isbn != null) {
    res.book.isbn = req.body.isbn;
  }
  if (req.body.author != null) {
    res.book.author = req.body.author;
  }

  try {
    const updatedBook = await res.book.save();
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete book
router.delete('/:id', getBook, async (req, res) => {
  try {
    await res.book.remove();
    res.json({ message: 'Deleted Book' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get book by ID
async function getBook(req, res, next) {
  let book;
  try {
    book = await Book.findById(req.params.id).populate('author');
    if (book == null) {
      return res.status(404).json({ message: 'Cannot find book' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.book = book;
  next();
}

module.exports = router;
