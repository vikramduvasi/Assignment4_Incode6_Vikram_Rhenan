const express = require('express');
const router = express.Router();
const db = require('../database');

// router.get('/home', (req, res) => {
//     res.render('pages/homepage');
// })



router.get('/home', (req, res) => {
    //  res.send(data.schedules);
    //    res.render('pages/schedules', { schedules: data.schedules })

    console.log('schedules')
    db.any('SELECT * FROM schedules;')
    console.log('schedules')
        .then((schedules) => {
            res.render('pages/home',
                {
                    schedules: schedules
                }
            )
        })

        .catch((error) => {
            console.log(error)
        })

    // console.log(data.users.length)
})

module.exports = router;