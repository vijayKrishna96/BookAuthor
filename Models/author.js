const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;