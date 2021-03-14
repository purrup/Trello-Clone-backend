const mongoose = require('mongoose')
const Card = require('../card.js')
const dbPath = 'mongodb://localhost/trello-clone'

mongoose.connect(dbPath, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('db error')
})

db.once('open', () => {
  console.log('db connected!')

  for (let i = 0; i < 5; i++) {
    Card.create({
      title: 'Card title-' + i,
      sort: i
    })
  }

  console.log('Cards seeds generated!')
})
