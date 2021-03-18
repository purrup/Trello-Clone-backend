const Boards = require('../models/board.js')
const mongoose = require('mongoose')

const boardController = {
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
              {
                $lookup: {
                  from: 'cards',
                  let: { listId: '$_id' }, // 定義變數：listId 為Lists model中的objectId
                  pipeline: [
                    {
                      $match: { $expr: { $eq: ['$listId', '$$listId'] } }
                    }
                  ],
                  as: 'cards'
                }
              }
            ],
            as: 'lists'
          }
        }
      ])
      res.send(board)
    } catch (error) {
      console.log(error)
      res.status(500).send()
    }
  },
  // 修改單一board
  async updateBoard(req, res) {
    res.send(`update board id: ${req.params.id}`)
  },
  // 刪除單一board
  async deleteBoard(req, res) {
    res.send(`delete board id: ${req.params.id}`)
  }
}

module.exports = boardController
