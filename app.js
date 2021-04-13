const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
const dbPath = process.env.MONGODB_URI || 'mongodb://localhost/trello-clone'
const cors = require('cors')
const passport = require('passport')
const cookieParser = require('cookie-parser')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const corsOptions = {
  origin: [
    'https://trello-clone-frontend-2021.herokuapp.com/',
    'http://localhost:8080'
  ],
  methods: ['GET', 'PUT', 'POST', 'OPTIONS', 'PATCH', 'DELETE', 'HEAD'],
  credentials: true
}
app.use(cors(corsOptions))
app.options('*', cors())
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
