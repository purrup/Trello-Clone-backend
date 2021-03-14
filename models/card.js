const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cardSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  boardId: {
    type: Schema.Types.ObjectId,
    // required: true,
    ref: 'board'
  },
  listId: {
    type: Schema.Types.ObjectId,
    // required: true,
    ref: 'list'
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user'
    }
  ],
  sort: {
    type: Number,
    decimal: true,
    required: true
  }
})

module.exports = mongoose.model('Card', cardSchema)
