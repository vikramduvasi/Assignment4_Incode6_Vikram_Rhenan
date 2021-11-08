const express = require('express');
const router = express.Router();
const db = require('../database');


router.get('/', (req, res) => {
    db.any('SELECT firstname, lastname, email, password FROM users;')
        .then((users) => res.render('pages/employee', { users }))
        .catch((err) => console.log(err));
});

module.exports = router;
