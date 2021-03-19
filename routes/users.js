const express = require('express')
const router = express.Router()

// 列出全部users
router.get('/', (req, res) => {
  res.send('send every users')
})
// 取得單一user的頁面
router.get('/:id', (req, res) => {
  res.send('send a certain user')
})
// 修改單一user
router.put('/:id', (req, res) => {
  res.send('edit a user')
})
// 刪除單一user
router.delete('/:id', (req, res) => {
  res.send('delete a user')
})

module.exports = router
