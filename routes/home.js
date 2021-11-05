const express = require('express');
const db = require('../database');
const router = express.Router();

router.get('/', (req, res) => {
  db.any('SELECT user_id, day, start_at, end_at FROM schedules;')
    .then((schedules) => res.render('pages/homepage', { schedules }))
    .catch((err) => console.log(err));
});

module.exports = router;
