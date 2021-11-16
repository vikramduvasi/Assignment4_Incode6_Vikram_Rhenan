const express = require('express')
//const { redirectToLogin } = require('../middleware/redirect')
const router = express.Router()
const db = require('../database');

router.get('/', (req, res) => {
    db.any(
        'SELECT users.id, firstname, lastname, day, start_at, end_at FROM users INNER JOIN schedules ON users.id = user_id;'
    )
        .then((schedules) => res.render('pages/schedule_management', { schedules }))
        .catch((err) => console.log(err));
});

router.post('/', (req, res) => {
    const { user_id, day, start_at, end_at } = req.body
    db.none('INSERT INTO schedules(user_id, day, start_at, end_at) VALUES($1, $2, $3, $4);', [user_id, day, start_at, end_at])


        // db.any('INSERT INTO schedules ( user_id, day, start_at, end_at) VALUES ($1, $2, $3, $4);'
        // [user_id, day, start_at, end_at])
        .then(() => {
            //console.log("abc")
            // res.send({
            //     user_id,
            //     day,
            //     start_at,
            //     end_at

            res.redirect('/')

        })

        .catch((err) => {
            console.log(err)
            res.send(err.message)
        })
})

module.exports = router;




