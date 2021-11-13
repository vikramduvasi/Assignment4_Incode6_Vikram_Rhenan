const express = require('express');
const router = express.Router();
const db = require('../database');



router.get('/', (req, res) => {
    db.any(
        'SELECT users.id, firstname, lastname, day, start_at, end_at FROM users INNER JOIN schedules ON users.id = user_id;'
    )
        .then((schedules) => res.render('pages/homepage', { schedules }))
        .catch((err) => console.log(err));
});


module.exports = router;
