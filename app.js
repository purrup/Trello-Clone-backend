const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const dbPath = 'mongodb://localhost/trello-clone'

mongoose.connect(dbPath, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => console.error.bind(console, 'connection error:'))
db.once('open', () => console.log('db successfully connected!'))

app.get('/', (req, res) => {
  res.send('This is trello-backend server')
})

app.listen(port, () => {
  console.log(`Server is now running on http://localhost:${port}`)
})
