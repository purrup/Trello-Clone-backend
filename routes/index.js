const express = require('express')
const router = express.Router()

// trello-clone首頁
router.get('/', (req, res) => {
  res.send('This is trello-backend server')
})

router.use('/boards', require('./boards.js'))
router.use('/lists', require('./lists.js'))
router.use('/cards', require('./cards.js'))
router.use('/users', require('./users.js'))

module.exports = router
