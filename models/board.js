const mongoose = require('mongoose')
const Schema = mongoose.Schema

const boardSchema = new Schema({
  title: {
    type: String,
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
