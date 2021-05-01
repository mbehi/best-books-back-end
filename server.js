'use strict';
// console.log('ooooh bring on the data!!!!!!');

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const PORT = 3001;

// TODO: Add Mongoose
const mongoose = require('mongoose');

// TODO Make a call to the Database
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection; 
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', functon() { 
  console.log('Are we connected to Mongoose?')
});

const userBookProfile = require('./models/User');

const User = new userBookProfile({
  name: '',
  description: '',
  status: '',
  favoriteBooks: [
    { bookName: ''},
    { bookName: ''},
    { bookName: ''}
  ]
});

User.save();

app.get('/user', getAllBooks)

function getAllBooks(request, response) {
  const name = request.query.name;
  console.log({name});
  userBookProfile.find({name}, (err, person) => {
    if(err) return console.error(err);
    console.log({person})
    response.send(person[0].cats);
  })
};

console.log('❤️ hello aloysious & Mohsin . . . welcome to the back-end! ❤️');

app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));