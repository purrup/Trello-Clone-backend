const express = require('express')
const router = express.Router()

// 列出全部boards
router.get('/', (req, res) => {
  res.send('send every boards')
})
// 取得單一board的頁面
router.get('/:id', (req, res) => {
  res.send('send a certain board')
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
