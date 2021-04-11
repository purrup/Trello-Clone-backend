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
  const result = await List.find({})
  if (result.length !== 0) {
    await List.collection.drop()
    console.log('Drop collection!')
  }

  const boards = await Board.find({})
  const trialUser = await User.find({})
  for (let i = 0; i < 30; i++) {
    List.create({
      title: '列表 ' + i,
      boardId: getRandomBoardId(boards),
      userCreated: trialUser[0]._id,
      order: i
    })
  }

  console.log('Lists seeds generated!')
})

function getRandomBoardId(boards) {
  const randomBoardIndex = Math.floor(Math.random() * Math.floor(boards.length))
  return boards[randomBoardIndex]._id
}
