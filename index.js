require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const session = require('express-session');

const app = express(); // creating an instance of express
const PORT = process.env.PORT || 4000;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// session config
app.use(session({
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    },
    name: "mrcoffee_sid",
    saveUninitialized: false,
    resave: false,
    secret: process.env.SESSION_SECRET
}))

// set ejs as template engine
app.set('view engine', 'ejs');

//set Static folder
app.use(express.static('public'));

// Routers
const signupRouter = require('./routes/signup');
const loginRouter = require('./routes/login');
const homeRouter = require('./routes/home');
const userRouter = require('./routes/users');
const errorRouter = require('./routes/error');

app.use('/', loginRouter);
app.use('/signup', signupRouter);
app.use('/home', homeRouter);
app.use('/users', userRouter);
app.use('*', errorRouter);

app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`));
