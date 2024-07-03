const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: String,
    price: String,
    description: String,
    image: String,
    author: String
});

const Book = mongoose.model('Book',bookSchema)

module.exports = Book;