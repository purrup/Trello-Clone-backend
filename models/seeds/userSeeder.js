const mongoose = require('mongoose')
const User = require('../user.js')
const dbPath = 'mongodb://localhost/trello-clone'
const bcrypt = require('bcrypt')

mongoose.connect(dbPath, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('db error')
})

db.once('open', async () => {
  console.log('db connected!')
  await User.collection.drop()
  for (let i = 0; i < 5; i++) {
    User.create({
      name: 'user' + i,
      email: 'email' + i + '@test.com',
      password: bcrypt.hashSync(`password${i}`, bcrypt.genSaltSync(10))
    })
  }

  console.log('Users seeds generated!')
})
