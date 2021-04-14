const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController.js')

// 取得單一user的資料
router.get('/', userController.getUser)

module.exports = router
