const express = require('express');
const router = express.Router();
const db = require('../database');
const bcrypt = require('bcryptjs');


router.get('/', (req, res) => {
    db.any('SELECT firstname, lastname, email, password FROM users;')
        .then((users) => res.render('pages/employee', { users }))
        .catch((err) => console.log(err));
});

router.post('/', (req, res) => {
    const { email, password } = req.body

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    const cleanedEmail = email.toLowerCase().trim()

    db.none('INSERT INTO users (email, password) VALUES ($1, $2);',
        [cleanedEmail, hash])
        .then(() => {
            res.send({
                email: cleanedEmail,
                password: hash
            })
                .catch((err) => {
                    console.log(err)
                    res.send(err.message)
                })
        })
})

module.exports = router;
