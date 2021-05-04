'use strict';
// console.log('ooooh bring on the data!!!!!');

const express = require('express');
const app = express();

// require mongoose
const mongoose = require('mongoose');

require('dotenv').config();

// will need later
const cors = require('cors');
app.use(cors());

// hey mongoose, connect to the database at localhost:27017
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
// I’m intentionally requiring this model AFTER I run mongoose.connect
const User = require('./models/User');
const { getMaxListeners } = require('./models/User');
// seed the database with some books, so I can retrieve them
const userProfile = new User({
  
  userEmail: 'aloysiousx@gmail.com',
  favoriteBooks: [
    { name: 'The Giver' },
    { name: 'Beyond Inclusion, Beyond Empowerment' }, { name: 'The secret life of bees' }
  ]
});

userProfile.save().then(() => console.log('successfully saved'));

// console.log(User);
app.get('/', (request, response) => {
  response.send('hello, cool book!');
});

// i am unsure about this line of code
app.get('/books', (request, response) => {
  // get all the books from the database
  User.find((err, databaseResults) => {
    console.log(databaseResults);
    // send them in my response
    response.send(databaseResults[0]);
  });
});

// route to get just one book
app.get('/book', (request, response) => {
  // set the user to access the query and email stuffs
  let user = request.query.user;
User.find({userEmail: 'aloysiousx@gmail.com' }, (err, databaseResults) => {
  //  [results at zero for just the dataaaaaaaa]
  // send them in my response
    response.send(databaseResults[0]);
  });
});


const PORT = process.env.PORT || 3001;

console.log('❤️ hello aloysious & Mohsin . . . welcome to the back-end! ❤️');

app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
