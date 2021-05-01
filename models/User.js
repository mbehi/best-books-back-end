'user strict';

// TODO: Bring in Mongoose
const mongoose = require('mongoose');

const { Schema } = mongoose;

// TODO: Configure the BookSchema to hold name, description, and status
const bookSchema = new Schema({
  name: String,
  description: String,
  status: String,
});


// TODO: Build a Mongoose 'User' schema with, at a minimum, valid keys for email (string), and books (array of BookSchema objects)
const UserSchema = new Schema({
  email: String,
  // array of activity Schema
  favoriteBooks: [bookSchema]
});

// TODO: Use your schema to craft a User Model
const User = mongoose.model('User', UserSchema);

// TODO: Modualize your code by putting your schema and model in its own separate file and requireing them into your server
module.exports = User;
