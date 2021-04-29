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

const userSchema = new Schema({
  name: String,
  email: String,
  // array of activity Schema
  books: [bookSchema]
});

//model of the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
