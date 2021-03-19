const express = require('express')
const router = express.Router()
const listController = require('../controllers/listController.js')

router.put('/:id', listController.updateList)
router.delete('/:id', listController.deleteList)

module.exports = router
