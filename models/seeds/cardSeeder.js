const mongoose = require('mongoose')
const Card = require('../card.js')
const User = require('../user.js')
const List = require('../list.js')
const dbPath = 'mongodb://localhost/trello-clone'

mongoose.connect(dbPath, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('db error')
})

db.once('open', async () => {
  console.log('db connected!')
  const lists = await List.find({})
  const users = await User.find({})
  for (let i = 0; i < 10; i++) {
    const randomListIndex = Math.floor(Math.random() * Math.floor(lists.length))
    const listId = lists[randomListIndex]._id
    const boardId = lists[randomListIndex].boardId
    Card.create({
      title: 'Card title-' + i,
      listId: listId,
      boardId: boardId,
      userCreated: getRandomUserId(users),
      order: i
    })
  }

  console.log('Cards seeds generated!')
})

function getRandomUserId(users) {
  const randomUserIndex = Math.floor(Math.random() * Math.floor(users.length))
  return users[randomUserIndex]._id
}
