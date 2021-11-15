const express = require('express')
const { redirectToLogin } = require('../middleware/redirect')
const router = express.Router()


router.get('/', redirectToLogin, (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err)
            res.send(err.message)
        } else {
            console.log(req.session)
            res.clearCookie('mrcoffee_sid')
            res.redirect('/')
        }
    })
})

module.exports = router