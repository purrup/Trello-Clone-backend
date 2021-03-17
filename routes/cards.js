const express = require('express')
const router = express.Router()

// 修改單一card
router.post('/:id', (req, res) => {
  res.send('edit a card')
})
// 刪除單一card
router.delete('/:id', (req, res) => {
  res.send('delete a card')
})

module.exports = router
