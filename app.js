const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const dbPath = 'mongodb://localhost/trello-clone'
const cors = require('cors')
const passport = require('passport')
const cookieParser = require('cookie-parser')

require('dotenv').config()

app.use(
  cors({
    origin: 'http://localhost:8080',
    credentials: true
  })
)
app.use(passport.initialize())
app.use(cookieParser())

mongoose.connect(dbPath, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => console.error.bind(console, 'connection error:'))
db.once('open', () => console.log('db successfully connected!'))

app.use(express.json()) // 取代body-parser
app.use('/', require('./routes'))

app.listen(port, () => {
  console.log(`Server is now running on http://localhost:${port}`)
})
