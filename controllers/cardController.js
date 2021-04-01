const Cards = require('../models/card.js')

const cardController = {
  async getCard(req, res) {
    try {
      const card = await Cards.findById(req.params.id)
      if (!card || card.length === 0) {
        res.status(404).end()
        return
      }
      res.send(card)
    } catch (error) {
      console.log(error)
      res.status(500).send()
    }
  },
  // 建立單一card
  async creatCard(req, res) {
    try {
      const { data } = req.body
      const card = await Cards.create({ ...data })
      if (!card || card.length === 0) {
        res.status(404).end()
        return
      }
      res.send(card)
    } catch (error) {
      console.log(error)
      res.status(500).send()
    }
  },
  // 修改單一card
  async updateCard(req, res) {
    try {
      const { data } = req.body
      const card = await Cards.findByIdAndUpdate(
        req.params.id,
        { $set: data }, // This $set helps prevent accidentally overwriting the whole document with updated data
        { new: true, useFindAndModify: false } // new: true => return the modified data instead of original one
      )
      if (!card || card.length === 0) {
        res.status(404).end()
        return
      }
      res.send(card)
    } catch (error) {
      console.log(error)
      res.status(500).send()
    }
  },
  // 刪除單一card
  async deleteCard(req, res) {
    try {
      const card = await Cards.findByIdAndDelete(req.params.id)
      if (!card || card.length === 0) {
        res.status(404).end()
        return
      }
      res.send(`delete return query: ${card}`)
    } catch (error) {
      console.log(error)
      res.status(500).send()
    }
  }
}
module.exports = cardController
