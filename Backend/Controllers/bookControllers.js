const Book = require("../Model/bookModel");

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find(req.query);
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching books', error });
    }
};

const getBooksById = async (req, res) => {
    try {
        const bookById = await Book.findById(req.params.bookId);
        if (!bookById) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(bookById);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching book', error });
    }
};

const addNewBook = async (req, res) => {
    try {
        const bookData = req.body;
        const book = new Book(bookData);
        await book.save();
        res.status(201).json({ message: 'Book successfully added' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding book', error });
    }
};

const updateBook = async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.bookId,
            req.body,
            { new: true }
        );
        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({ message: 'Book updated', updatedBook });
    } catch (error) {
        res.status(500).json({ message: 'Error updating book', error });
    }
};

const deleteBook = async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.bookId);
        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({ message: 'Book deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting book', error });
    }
};

module.exports = {
    getAllBooks,
    getBooksById,
    addNewBook,
    updateBook,
    deleteBook
};
