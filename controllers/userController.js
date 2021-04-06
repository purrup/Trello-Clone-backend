const User = require('../models/user.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userController = {
  async signUp(req, res) {
    const { email, password, name } = req.body
    if (!email || !password || !name) {
      res.status(400).send('請填入所有欄位資料！')
      return
    }
    try {
      const user = await User.findOne({ email })
      if (user) {
        res.status(409).send({ message: '此 email 已被註冊過！' })
      } else {
        const newUser = await User.create({
          email,
          password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
          name
        })
        console.log('newUser', newUser)
        const payload = { id: newUser._id }
        const token = jwt.sign(payload, process.env.JWT_SECRET)
        res.cookie('token', token, {
          expires: new Date(Date.now() + 1000 * 3600 * 24),
          httpOnly: true
        })
        res.status(201).send(newUser)
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
          .json({ status: 'error', message: 'no such user found' })
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return res
          .status(401)
          .json({ status: 'error', message: 'passwords did not match' })
      }
      // issue token
      const payload = { id: user._id }
      const token = jwt.sign(payload, process.env.JWT_SECRET)
      res.cookie('token', token, {
        expires: new Date(Date.now() + 1000 * 3600 * 24), // 1 day
        httpOnly: true
      })
      return res.send(user)
    } catch (error) {
      console.log(error)
      res.status(500).send()
    }
  },

  async getUser(req, res) {
    try {
      const user = await User.findById(req.params.id)
      res.send(user)
    } catch (error) {
      console.log(error)
      res.status(500).send()
    }
  }
}

module.exports = userController
