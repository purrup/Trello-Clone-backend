const express = require('express')
const router = express.Router()
const boardController = require('../controllers/boardController.js')

router.get('/', boardController.getBoards)
router.get('/:id', boardController.getBoard)
router.post('/:id', boardController.updateBoard)
router.delete('/:id', boardController.deleteBoard)

module.exports = router
