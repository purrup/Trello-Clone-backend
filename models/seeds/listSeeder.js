const mongoose = require('mongoose')
const Board = require('../board.js')
const List = require('../list.js')
const User = require('../user.js')
const dbPath = 'mongodb://localhost/trello-clone'

mongoose.connect(dbPath, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('db error')
})

db.once('open', async () => {
  console.log('db connected!')

  const boards = await Board.find({})
  const users = await User.find({})

  for (let i = 0; i < 5; i++) {
    List.create({
      title: 'List title-' + i,
      boardId: getRandomBoardId(boards),
      userCreated: getRandomUserId(users),
      order: i
    })
  }

  console.log('Lists seeds generated!')
})

function getRandomBoardId(boards) {
  const randomBoardIndex = Math.floor(Math.random() * Math.floor(boards.length))
  return boards[randomBoardIndex]._id
}

function getRandomUserId(users) {
  const randomUserIndex = Math.floor(Math.random() * Math.floor(users.length))
  return users[randomUserIndex]._id
}
