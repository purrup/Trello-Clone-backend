const User = require('../models/user.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userController = {
  async signUp(req, res, next) {
    const { email, password, name } = req.body
    if (!email || !password || !name) {
      res.status(400).send({ message: '請填入所有欄位資料！' })
      return
    }
    try {
      const user = await User.findOne({ email })
      if (user) {
        return res.status(409).send({ message: '此 email 已被註冊過！' })
      } else {
        const newUser = await User.create({
          email,
          password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
          name
        })
        const payload = { id: newUser._id }
        const token = jwt.sign(payload, process.env.JWT_SECRET)
        res.json({
          expires: new Date(Date.now() + 1000 * 3600 * 24),
          user: newUser,
          token: token
        })
        return res.status(201)
      }
    } catch (error) {
      console.log(error)
      res.status(500).send()
    }
  },
  async logIn(req, res) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ email })
      if (!user) {
        return res
          .status(401)
          .send({ status: 'error', message: '此電子郵件尚未註冊' })
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return res
          .status(401)
          .send({ status: 'error', message: '密碼有誤，請重新輸入' })
      }
      // issue token
      const payload = { id: user._id }
      const token = jwt.sign(payload, process.env.JWT_SECRET)
      req.logIn(user, { session: false }, (err) => {
        if (err) {
          return console.log(err)
        }
        res.json({
          expires: new Date(Date.now() + 1000 * 3600 * 24), // 1 day
          token: token,
          user
        })
      })
      console.log('req.user login: ', req.user)
    } catch (error) {
      console.log(error)
      res.status(500).send()
    }
  },

  async getUser(req, res) {
    try {
      const user = await User.findById(req.user._id)
      res.send(user)
    } catch (error) {
      console.log(error)
      res.status(500).send()
    }
  },
  logOut(req, res) {
    try {
      req.logout()
      res.status(200).end()
    } catch (error) {
      console.log(error)
      res.status(500).send()
    }
  }
}

module.exports = userController
