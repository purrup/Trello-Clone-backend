const mongoose = require('mongoose')
const Board = require('../board.js')
const User = require('../user.js')
const dbPath = 'mongodb://localhost/trello-clone'

mongoose.connect(dbPath, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('db error')
})

db.once('open', async () => {
  console.log('db connected!')
  const users = await User.find({})

  for (let i = 0; i < 5; i++) {
    Board.create({
      title: 'Board title-' + i,
      userId: getRandomUserId(users)
    })
  }

  console.log('Boards seeds generated!')
})

function getRandomUserId(users) {
  const randomUserIndex = Math.floor(Math.random() * Math.floor(users.length))
  return users[randomUserIndex]._id
}
