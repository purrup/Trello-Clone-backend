const express = require('express')
const router = express.Router()
const cardController = require('../controllers/cardController.js')

router.get('/:id', cardController.getCard)
router.post('/', cardController.creatCard)
router.put('/:id', cardController.updateCard)
router.delete('/:id', cardController.deleteCard)

module.exports = router
