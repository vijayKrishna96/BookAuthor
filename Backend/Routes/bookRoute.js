const express = require('express');
const { getAllBooks, getBooksById, addNewBook, updateBook, deleteBook } = require('../Controllers/bookControllers');
const router = express.Router();

router.get('/',getAllBooks)

router.get('/:bookId',getBooksById)

router.post('/',addNewBook)

router.patch('/:bookId',updateBook)

router.delete('/:bookId',deleteBook)

module.exports = router;