const Lists = require('../models/list.js')
const Cards = require('../models/card.js')

const listController = {
  // 修改單一list
  async updateList(req, res) {
    try {
      const list = await Lists.findByIdAndUpdate(
        req.params.id,
        { $set: req.body }, // This $set helps prevent accidentally overwriting the whole document with updated data
        { new: true, useFindAndModify: false } // new: true => return the modified data instead of original one
      )
      if (!list || list.length === 0) {
        res.status(404).end()
        return
      }
      res.send(list)
    } catch (error) {
      console.log(error)
      res.status(500).send()
    }
  },

  // 刪除單一list
  async deleteList(req, res) {
    try {
      const list = await Lists.findByIdAndDelete(req.params.id)
      // delete all cards connected with the list
      await Cards.deleteMany({ listId: req.params.id })
      if (!list || list.length === 0) {
        res.status(404).end()
        return
      }
      res.send(`delete return query: ${list}`)
    } catch (error) {
      console.log(error)
      res.status(500).send()
    }
  }
}

module.exports = listController
