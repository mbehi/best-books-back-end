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
const {User, userBookProfile} = require('./models/User');
// seed the database with some books, so I can retrieve them
const userBookProfile = new User({
  
  userEmail: 'Aloysious',
  description: '',
  status: '',
  favoriteBooks: [
    { bookName: 'The Giver' },
    { bookName: 'Beyond Inclusion, Beyond Empowerment' }, { bookName: 'The secret life of bees' }
  ]
}); userBookProfile.save(function (err) {
  if (err) {
    console.err(err);
  } else {
    console.log('saved the book');
  }
});
app.get('/', (request, response) => {
  response.send('hello, cool book!');
});
// app.get('/books', (request, response) => {
//   // get all the books from the database
//   userBookProfile.find((err, databaseResults) => {
//     // send them in my response
//     response.send(databaseResults);
//   });
// });

// route to get just one book
app.get('/book', (request, response) => {
  // set the user to access the query and email stuffs
  let user = req.query.user;
 userBookProfile.find({userEmail: user }, (err, databaseResults) => {
  // send them in my response 
  //  [results at zero for just the dataaaaaaaa]
    response.send(databaseResults[0]);
  });
});


const PORT = process.env.PORT || 3001;

console.log('❤️ hello aloysious & Mohsin . . . welcome to the back-end! ❤️');

app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
