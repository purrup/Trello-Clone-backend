const express = require('express')
const router = express.Router()

// 修改單一list
router.post('/:id', (req, res) => {
  res.send('edit a list')
})
// 刪除單一list
router.delete('/:id', (req, res) => {
  res.send('delete a list')
})

module.exports = router
