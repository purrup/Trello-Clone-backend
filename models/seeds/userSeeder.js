const mongoose = require('mongoose')
const User = require('../user.js')
const dbPath = 'mongodb://localhost/trello-clone'

mongoose.connect(dbPath, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('db error')
})

db.once('open', () => {
  console.log('db connected!')

  for (let i = 0; i < 5; i++) {
    User.create({
      name: 'User No.' + i,
      email: 'User email-' + i,
      password: 'User password-' + i
    })
  }

  console.log('Users seeds generated!')
})
