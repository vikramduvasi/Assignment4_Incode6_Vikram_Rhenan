const express = require('express');
const db = require('../database');
const router = express.Router();

router.get('/', (req, res) => {
  db.any('SELECT firstname, lastname, email FROM users;')
    .then((users) => res.render('pages/homepage', { users }))
    .catch((err) => console.log(err));
});

module.exports = router;
