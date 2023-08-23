require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const routers = require('./routes/index')

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb')
const db = mongoose.connection
db.once('open', () => console.log('Connected to db'))

const app = express()
app.use(bodyParser.json())
app.use(routers)
app.listen(3000, () => {
  console.log('Server is running on port 3000')
})


