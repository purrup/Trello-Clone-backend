const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController.js')

// sign in
router.post('/', userController.logIn)
// 取得單一user的頁面
router.get('/profile/:id', userController.getUser)
// 修改單一user
router.put('/:id', (req, res) => {
  res.send('edit a user')
})
// 刪除單一user
router.delete('/:id', (req, res) => {
  res.send('delete a user')
})

module.exports = router
