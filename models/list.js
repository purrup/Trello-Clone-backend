const mongoose = require('mongoose')
const Schema = mongoose.Schema

const listSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  userCreated: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user'
  },
  boardId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'board'
  },
  order: {
    type: Number,
    decimal: true,
    required: true
  }
})

module.exports = mongoose.model('List', listSchema)
