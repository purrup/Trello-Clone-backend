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
  try {
    console.log('db connected!')
    const result = await User.find({})
    if (result.length !== 0) {
      await User.collection.drop()
      console.log('Drop collection!')
    }
    // generate trial user
    User.create({
      name: '試用帳號',
      email: 'trial@gmail.com',
      password: bcrypt.hashSync('123', bcrypt.genSaltSync(10))
    })
    console.log('Trial user has been generated!')
  } catch (error) {
    console.log(error)
  }
})
