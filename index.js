require('dotenv').config();
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

// Routers
const loginRouter = require('./routes/login');
const homeRouter = require('./routes/home');

app.use('/', loginRouter);
app.use('/home', homeRouter);

app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`));
