'use strict';
// console.log('ooooh bring on the data!!!!!');

const express = require('express');
const app = express();

// require mongoose
const mongoose = require('mongoose');

require('dotenv').config();

// will need later
// const cors = require('cors');
// app.use(cors());

// hey mongoose, connect to the database at localhost:27017
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
// I’m intentionally requiring this model AFTER I run mongoose.connect
const User = require('./models/User');
// seed the database with some books, so I can retrieve them
const myBook = new User({
  name: '',
  description: '',
  status: '',
  favoriteBooks: [
    { bookName: '' },
    { bookName: '' }, { bookName: '' }
  ]
});
myBook.save(function (err) {
  if (err) {
    console.err(err);
  } else {
    console.log('saved the book');
  }
});
app.get('/', (request, response) => {
  response.send('hello, cool book!');
});
app.get('/books', (request, response) => {
  // get all the books from the database
  myBook.find((err, databaseResults) => {
    // send them in my response
    response.send(databaseResults);
  });
});

// route to get just one book
app.get('/book', (request, response) => {
  myBook.find({ name: request.query.name }, (err, databaseResults) => {
  // send them in my response
    response.send(databaseResults);
  });
});


const PORT = process.env.PORT || 3001;

console.log('❤️ hello aloysious & Mohsin . . . welcome to the back-end! ❤️');

app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
