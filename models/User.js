const mongoose = require('mongoose');

const { Schema } = mongoose;

// defining book properties and thier datatypes :
const bookSchema = new Schema({
  name: String,
  description: String,
  status: String,
});

// incldes the book schema 
// user is an object that contains an array of book objects
const userSchema = new Schema({
  userName: String,
  userEmail: String,
  // array of activity Schema
  favoriteBooks: [bookSchema]
});

//model of the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
