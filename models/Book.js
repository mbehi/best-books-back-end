const mongoose = require('mongoose');

const { Schema } = mongoose;

const activitySchema = new Schema({
  activityName: String
});

const bookSchema = new Schema({
  name: String,
  description: String,
  status: String,
  // array of activity Schema
  favoriteBooks: [activitySchema]
});

//model of the schema
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
