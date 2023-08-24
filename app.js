require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')

const { requestLogger, errorLogger } = require('./middlewares/logger')
const handleError = require('./middlewares/handleError')
const { errors } = require('celebrate')

const routers = require('./routes/index')

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb')
const db = mongoose.connection
db.once('open', () => console.log('Connected to db'))

const app = express()
app.use(cors())
app.use(helmet())

app.use(bodyParser.json())
app.use(routers)

app.use(errors())
app.use(handleError)

app.use(requestLogger)
app.use(errorLogger)

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
