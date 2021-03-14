const mongoose = require('mongoose')
const User = require('../user.js')
const List = require('../list.js')
const Card = require('../card.js')
const Board = require('../board.js')
const dbPath = 'mongodb://localhost/trello-clone'
mongoose.connect(dbPath, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
const modelsArray = [User, List, Card, Board]

db.on('error', () => {
  console.log('db error')
})

db.once('open', () => {
  modelsArray.forEach(async (model) => {
    if (model) {
      await model.collection.drop()
    } else {
      console.log(`${model} does not exit`)
    }
  })
})
