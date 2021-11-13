const express = require('express');
const router = express.Router();
const db = require('../database');

// const userSession = req.session.userId

// router.get('/:id', (req, res) => {
//     db.any('SELECT * FROM schedules WHERE user_id = $1', [userSession])
// })

router.get('/', (req, res) => {
    db.any('SELECT user_id, day, start_at, end_at FROM schedules;')
        .then((schedules) => res.render('pages/homepage', { schedules }))
        .catch((err) => console.log(err));
});


module.exports = router;
