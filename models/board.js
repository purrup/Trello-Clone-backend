const mongoose = require('mongoose')
const Schema = mongoose.Schema

const boardSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user'
    }
  ]
})

module.exports = mongoose.model('Board', boardSchema)
