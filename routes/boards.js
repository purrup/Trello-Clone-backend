const express = require('express')
const router = express.Router()
const Boards = require('../models/board.js')
const mongoose = require('mongoose')

// 列出全部boards
router.get('/', async (req, res) => {
  // Board.find({members: user_id}) // where user_id is the ID of the user
  const boards = await Boards.find({})
  res.send(boards)
})
// 取得單一board
router.get('/:id', async (req, res) => {
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
})
// 修改單一board
router.post('/:id', (req, res) => {
  res.send('edit a board')
})
// 刪除單一board
router.delete('/:id', (req, res) => {
  res.send('delete a board')
})

module.exports = router
