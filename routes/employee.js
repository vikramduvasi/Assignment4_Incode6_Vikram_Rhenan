const express = require('express');
const router = express.Router();
const db = require('../database');

//validations
//const validation = require('../middleware/validationMiddleware')
//const userSchema = require('../validations/uservalidation')

router.get('/:userId', (req, res) => {
  console.log(req.params.userId);
  db.any(
    `SELECT users.id, firstname, lastname, email, day, start_at, end_at FROM users INNER JOIN schedules ON users.id = user_id WHERE users.id = ${Number(
      req.params.userId
    )};`
  )
    .then((data) => {
      res.render('pages/employee', { data });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
