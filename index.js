const express = require('express');
const bcrypt = require('bcryptjs');
const morgan = require('morgan');
const db = require('./database');

const app = express(); // creating an instance of express
const PORT = process.env.PORT || 4000;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// set ejs as template engine
app.set('view engine', 'ejs');

// Login page
app.get('/', (req, res) => {
  res.render('pages/login');
});

app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`));
