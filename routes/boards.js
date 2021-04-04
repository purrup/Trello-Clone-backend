const express = require('express')
const router = express.Router()
const boardController = require('../controllers/boardController.js')

router.post('/', boardController.createBoard)
router.get('/user/:id', boardController.getBoards)
router.get('/:id', boardController.getBoard)
router.put('/:id', boardController.updateBoard)
router.delete('/:id', boardController.deleteBoard)

module.exports = router
