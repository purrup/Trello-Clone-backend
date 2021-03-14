const mongoose = require('mongoose')
const List = require('../list.js')
const dbPath = 'mongodb://localhost/trello-clone'

mongoose.connect(dbPath, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('db error')
})

db.once('open', () => {
  console.log('db connected!')

  for (let i = 0; i < 5; i++) {
    List.create({
      title: 'List title-' + i,
      order: i
    })
  }

  console.log('Lists seeds generated!')
})
