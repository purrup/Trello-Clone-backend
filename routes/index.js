const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController.js')
const passport = require('../config/passport.js')
const authenticated = passport.authenticate('jwt', {
  session: false
})

router.post('/login', userController.logIn)
router.post('/signup', userController.signUp)
router.post('/logout', userController.logOut)

router.use('/boards', authenticated, require('./boards.js'))
router.use('/lists', authenticated, require('./lists.js'))
router.use('/cards', authenticated, require('./cards.js'))
router.use('/users', authenticated, require('./users.js'))

module.exports = router
