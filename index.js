const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

const authorsRouter = require('./Routes/authorRoute');
const booksRouter = require('./Routes/bookRoute');

app.use('/authors', authorsRouter);
app.use('/books', booksRouter);


document.write(5 + 6);


mongoose.connect('mongodb+srv://vk856549:Z6XhVzbXzKxVkojL@books.yh9wi84.mongodb.net/?retryWrites=true&w=majority&appName=Books', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = app;
