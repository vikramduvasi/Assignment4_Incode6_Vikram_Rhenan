const express = require('express');
const router = express.Router();
const db = require('../database');
const bcrypt = require('bcryptjs');

//validations
const validation = require('../middleware/validationMiddleware')
const userSchema = require('../validations/uservalidation')


router.get('/', (req, res) => {
    db.any('SELECT firstname, lastname, email, password FROM users;')
        .then((users) => res.render('pages/employee', { users }))
        .catch((err) => console.log(err));
});

router.post('/', validation(userSchema), (req, res) => {
    const { firstname, lastname, email, password } = req.body

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    const cleanedEmail = email.toLowerCase().trim()

    // res.send({
    //     firstname,
    //     lastname,
    //     email: cleanedEmail,
    //     password: hash
    // })
    db.none('INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4);',
        [firstname, lastname, cleanedEmail, hash])
        .then(() => {
            res.send({
                firstname,
                lastname,
                email: cleanedEmail,
                password: hash
            })

        })
        .catch((err) => {
            console.log(err)
            res.send(err.message)
        })
})

module.exports = router;
