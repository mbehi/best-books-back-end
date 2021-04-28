'use strict';
console.log('ooooh bring on the data!!!!!');

const express = require('express');
const app = express();

require('dotenv').config();

const cors = require('cors');
app.use(cors());


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));

console.log('❤️ hello aloysious & Mohsin . . . welcome to the back-end! ❤️');
