const express = require('express');
const router = express.Router();

//validations
const validation = require('../middleware/validationMiddleware')
const userSchema = require('../validations/uservalidation')


router.get('/', (req, res) => {
  res.render('pages/login');
});

module.exports = router;
