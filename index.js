const express = require('express')
const bycrypt = require('bycryptjs')
const morgan = require('morgan')
const db = require('./database')


const app = express() // creating an instance of express
const PORT = process.env.PORT || 4000


//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))


app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`))