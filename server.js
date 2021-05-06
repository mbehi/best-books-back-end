'use strict';
// console.log('ooooh bring on the data!!!!!');

const express = require('express');
const app = express();

// this line of code allows us to handle the data [body] of our post requests
app.use(express.json());

// require mongoose
const mongoose = require('mongoose');

require('dotenv').config();

// will need later
const cors = require('cors');
app.use(cors());

// hey mongoose, connect to the database at localhost:27017
// I’m intentionally requiring this model AFTER I run mongoose.connect
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Was assisted by Kristian who was able to get the server to hold data and save by using = https://cloud.mongodb.com/
// we created a new env variable to house the data. 
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to mongodb');
    app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
  }).catch((e) => {
    console.log('error:', e);
  });

const User = require('./models/User');
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


app.get('/books', (request, response) => {
  // get all the users from the database
  let emailFromRequest = request.params
  User.find({}, (error, databaseResults) => {
    console.log(databaseResults, 'in /books route');
    // send them in my response
    response.send(databaseResults[0]);
  });
});

// route to get just one book
app.get('/book', (request, response) => {
  // set the user to access the query and email stuffs
  let user = request.query.user;
  User.find({ userEmail: 'aloysiousx@gmail.com' }, (error, databaseResults) => {
    //  [results at zero for just the dataaaaaaaa]
    // send them in my response
    response.send(databaseResults[0]);
  });
});

// Add a new route and handler function to your server, to respond to `POST` requests to `/books`. This is your book-creation end point. Verify it's working by sending a raw POST request via your REST Client. 
app.post('/books', (request, response) => {
  console.log(request.body);
  // find the user in our database
  User.find({ email: request.body.email }, (error, databaseResults) => {
    if (databaseResults.length < 1) {
      response.status(400).send('shaniqua don\'t live here no MO!')
    } else {
      let user = databaseResults[0];
      user.favoriteBooks.push({
        name: request.body.name,
        description: request.body.description,
      });
      user.save().then( (databaseResults) => {
        console.log(databaseResults, 'returning database results');
        response.send(databaseResults.favoriteBooks);
      });
    }
  });
});


const PORT = process.env.PORT || 3001;

console.log('❤️ hello aloysious & Mohsin . . . welcome to the back-end! ❤️');

