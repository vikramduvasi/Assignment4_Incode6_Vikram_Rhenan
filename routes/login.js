const express = require('express');
const db = require('../database');
const bcrypt = require('bcryptjs');
const { redirectToHome } = require('../middleware/redirect');
const router = express.Router();

//validations
// const validation = require('../middleware/validationMiddleware')
// const userSchema = require('../validations/uservalidation')

const isValid = (value, regex) => {
  return regex.test(value);
};

// Regex

const emailRegex =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

// Password regex that requires at least 8 characters, one letter, and one number. No special characters accepted.
// const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const passwordRegex = /^[^<>]{6,}$/;

const cleanEmail = (email) => {
  return email ? email.toLowerCase().trim() : '';
};

router.get('/', redirectToHome, (req, res) => {
  res.render('pages/login');
});

router.post('/', redirectToHome, (req, res) => {
  const { email, password } = req.body;
  const cleanedEmail = cleanEmail(email);

  //1. validate

  if (!email || !password)
    return res.send({ msg: 'Please enter both email and password' });
  if (!isValid(cleanedEmail, emailRegex))
    return res.send({ msg: 'Email is not valid' });
  if (!isValid(password, passwordRegex))
    return res.send({ msg: 'Password is not valid' });

  //2. does user exist

  //   $(document).ready(function(){
  //     $("#myBtn").click(function(){
  //         $("#myToast").toast("show");
  //     });
  // });

  db.oneOrNone('SELECT * FROM users WHERE email = $1;', [cleanedEmail])
    .then((user) => {
      if (!user) {
        return res.send({
          idSelector: '#wrong-email',
          msg: 'No user with the entered email please enter a valid email',
        });
      }
      //3 if so is password correct?
      const checkPassword = bcrypt.compareSync(password, user.password);
      if (!checkPassword)
        return res.send({
          idSelector: '#wrong-password',
          msg: 'Credentails are not correct',
        });

      //4 user is valid
      console.log(req.session);
      req.session.userId = user.id;
      res.send({
        redirectHome: true,
      });
      // res.redirect('/home'); /// here redrect to schedules of that user with userD (/home:)
    })
    .catch((error) => {
      console.log(error);
      res.send(error.message);
    });
});

module.exports = router;
