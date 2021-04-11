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
  const result = await Card.find({})
  if (result.length !== 0) {
    await Card.collection.drop()
    console.log('Drop collection!')
  }
  const lists = await List.find({})
  const trialUser = await User.find({})
  for (let i = 0; i < 90; i++) {
    const randomListIndex = Math.floor(Math.random() * Math.floor(lists.length))
    const listId = lists[randomListIndex]._id
    const boardId = lists[randomListIndex].boardId
    Card.create({
      title: '卡片 ' + i,
      listId: listId,
      boardId: boardId,
      userCreated: trialUser[0]._id,
      order: i
    })
  }

  console.log('Cards seeds generated!')
})
