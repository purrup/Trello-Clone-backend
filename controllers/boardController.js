const Boards = require('../models/board.js')
const Lists = require('../models/list.js')
const Cards = require('../models/card.js')

const mongoose = require('mongoose')

const boardController = {
  // 建立一個board
  async createBoard(req, res) {
    try {
      const { data } = req.body
      const board = await Boards.create({ ...data })
      if (!board || board.length === 0) {
        res.status(404).end()
        return
      }
      res.send(board)
    } catch (error) {
      console.log(error)
      res.status(500).send()
    }
  },
  // 列出全部boards
  async getBoards(req, res) {
    try {
      const boards = await Boards.find({})
      res.send(boards)
    } catch (error) {
      console.log(error)
      res.status(500).send()
    }
  },
  // 取得單一board
  async getBoard(req, res) {
    try {
      // 取得board之下的lists and cards
      const board = await Boards.aggregate([
        { $match: { _id: mongoose.Types.ObjectId(req.params.id) } },
        {
          $lookup: {
            from: 'lists',
            let: { boardId: '$_id' }, // 定義boardId為Boards model中的objectId
            pipeline: [
              {
                $match: { $expr: { $eq: ['$boardId', '$$boardId'] } }
              },
              { $sort: { order: 1 } },
              {
                $lookup: {
                  from: 'cards',
                  let: { listId: '$_id' }, // 定義變數：listId 為Lists model中的objectId
                  pipeline: [
                    {
                      $match: { $expr: { $eq: ['$listId', '$$listId'] } }
                    },
                    { $sort: { order: 1 } }
                  ],
                  as: 'cards'
                }
              }
            ],
            as: 'lists'
          }
        }
      ])
      if (!board || board.length === 0) {
        res.status(404).end()
        return
      }
      res.send(board[0])
    } catch (error) {
      console.log(error)
      res.status(500).send()
    }
  },
  // 修改單一board
  async updateBoard(req, res) {
    try {
      const { data } = req.body
      if (!data) {
        return res.status(400).send({
          message: 'Data to update can not be empty!'
        })
      }
      const board = await Boards.findByIdAndUpdate(
        req.params.id,
        { $set: data }, // This $set helps prevent accidentally overwriting the whole document with updated data
        { new: true, useFindAndModify: false } // new: true => return the modified data instead of original one
      )
      if (!board || board.length === 0) {
        res.status(404).end()
        return
      }
      res.send(board)
    } catch (error) {
      console.log(error)
      res.status(500).send()
    }
  },
  // 刪除單一board
  async deleteBoard(req, res) {
    try {
      const board = await Boards.findByIdAndDelete(req.params.id)
      // delete all lists and cards connected with the board
      await Lists.deleteMany({ boardId: req.params.id })
      await Cards.deleteMany({ boardId: req.params.id })

      if (!board || board.length === 0) {
        res.status(404).end()
        return
      }
      res.send(`delete return query: ${board}`)
    } catch (error) {
      console.log(error)
      res.status(500).send()
    }
  }
}

module.exports = boardController
