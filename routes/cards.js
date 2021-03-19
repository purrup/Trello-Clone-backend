const express = require('express')
const router = express.Router()
const cardController = require('../controllers/cardController.js')

router.post('/:id', cardController.updateCard)
router.delete('/:id', cardController.deleteCard)

module.exports = router
