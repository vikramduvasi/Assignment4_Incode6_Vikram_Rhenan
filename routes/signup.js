const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../database');
const { redirectToHome } = require('../middleware/redirect');
const router = express.Router();

//validations
// const validation = require('../middleware/validationMiddleware')
// const userSchema = require('../validations/uservalidation')


const isValid = (value, regex) => {
  return regex.test(value);
};


router.get('/', redirectToHome, (req, res) => {
  res.render('pages/signup');
});

router.post('/', (req, res) => {
  const { firstname, lastname, email, password, confirmPassword } = req.body;
  const cleanedEmail = email.toLowerCase().trim();

  // Regex

  const firstNameRegex = /[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{0,20}$/;
  const lastNameRegex = /[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{0,20}$/;
  const emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  // Password regex that requires at least 8 characters, one letter, and one number. No special characters accepted.
  // const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const passwordRegex = /^[^<>]{6,}$/;
  // // Sign-up form validation

  if (!isValid(firstname, firstNameRegex)) return res.send('First name is not valid');
  if (!isValid(lastname, lastNameRegex)) return res.send('Last name is not valid');
  if (!isValid(cleanedEmail, emailRegex)) return res.send('Email is not valid');
  if (!isValid(password, passwordRegex)) return res.send('Password is not valid');

  if (password !== confirmPassword) return res.send("Passwords don't match");

  // 1. validate! - yup and joi are decent validation packages

  // if (!email || !password || !confirmPassword) req.flash("error", "Please enter all fields")
  // if (!isValid(cleanedEmail, emailRegex)) req.flash("error", "Email not valid")
  // if (!isValid(password, passwordRegex)) req.flash("error", "Password must be 6 characters or more")
  // if (password !== confirmPassword) req.flash("error", "Passwords don't match")
  // if (req.session.flash.error.length > 0) return res.redirect("/users/register")

  // Check if email already exists in database
  console.log('checking emiail exist')
  db.oneOrNone('SELECT email FROM users WHERE email = $1', [cleanedEmail])
    .then((user) => {
      if (user) return res.send('User already exists');
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      db.none(
        'INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4)',
        [firstname, lastname, cleanedEmail, hash])
        .then(() => {
          res.redirect('/');
        })
        .catch((error) => {
          console.log(error)
          res.send(error.message)
        })

    })
    .catch((err) => {
      console.log(err);
      res.send(err.message);
    });
});
module.exports = router;
