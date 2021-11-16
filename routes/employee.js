const express = require('express');
const router = express.Router();
const db = require('../database');


//validations
//const validation = require('../middleware/validationMiddleware')
//const userSchema = require('../validations/uservalidation')


router.get('/', (req, res) => {
    db.any('SELECT firstname, lastname, email FROM users;')
        .then((users) => {

            db.any('SELECT * FROM schedules;')

                .then((schedules) => res.render('pages/employee', { users, schedules }))
                .catch((err) => console.log(err));

        })
        .catch((err) => console.log(err));


});

router.get('/', (req, res) => {

});


module.exports = router;
