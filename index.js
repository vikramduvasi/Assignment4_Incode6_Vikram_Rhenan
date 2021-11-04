// require('dotenv').config()
const express = require('express')
const bcrypt = require('bcryptjs')
const morgan = require('morgan')
const db = require('./database')


const app = express() // creating an instance of express
const PORT = process.env.PORT || 4000
console.log(PORT)

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(express.static('public'))
app.set('view engine', 'ejs')

//ROUTES

// app.use


app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`))