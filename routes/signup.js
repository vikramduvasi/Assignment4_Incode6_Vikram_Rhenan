const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../database');
const router = express.Router();

//validations
const validation = require('../middleware/validationMiddleware')
const userSchema = require('../validations/uservalidation')


// const isValid = (value, regex) => {
//   return regex.test(value);
// };

router.get('/', (req, res) => {
  res.render('pages/signup');
});

router.post('/', validation(userSchema), (req, res) => {
  const { firstname, lastname, email, password, confirmPassword } = req.body;
  const cleanedEmail = email.toLowerCase().trim();

  // Regex

  // const firstNameRegex = /[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{0,20}$/;
  // const lastNameRegex = /[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{0,20}$/;
  // const emailRegex =
  //   /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  // // Password regex that requires at least 8 characters, one letter, and one number. No special characters accepted.
  // const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  // // Sign-up form validation

  // if (!isValid(firstname, firstNameRegex))
  //   return res.send('First name is not valid');
  // if (!isValid(lastname, lastNameRegex))
  //   return res.send('Last name is not valid');
  // if (!isValid(cleanedEmail, emailRegex)) return res.send('Email is not valid');
  // if (!isValid(password, passwordRegex))
  //   return res.send('Password is not valid');
  // if (password !== confirmPassword) return res.send("Passwords don't match");

  // Check if email already exists in database

  db.oneOrNone('SELECT email FROM users WHERE email = $1', [cleanedEmail])
    .then((user) => {
      if (user) return res.send('User already exists');
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      db.none(
        'INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4)',
        [firstname, lastname, cleanedEmail, hash]
      );
      res.redirect('/users');
    })
    .catch((err) => {
      console.log(err);
      res.send(err.message);
    });
});

module.exports = router;
