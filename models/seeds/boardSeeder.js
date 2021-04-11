const mongoose = require('mongoose')
const Board = require('../board.js')
const User = require('../user.js')
const dbPath = process.env.MONGODB_URI || 'mongodb://localhost/trello-clone'

mongoose.connect(dbPath, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('db error')
})

db.once('open', async () => {
  console.log('db connected!')
  const result = await Board.find({})
  if (result.length !== 0) {
    await Board.collection.drop()
    console.log('Drop collection!')
  }
  const trialUser = await User.find({})
  for (let i = 0; i < 5; i++) {
    Board.create({
      title: '看板' + i,
      userCreated: trialUser[0]._id
    })
  }
  console.log('Boards seeds generated!')
})
