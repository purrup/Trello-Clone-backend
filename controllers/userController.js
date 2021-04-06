const User = require('../models/user.js')
const bcrypt = require('bcrypt')

// JWT
const jwt = require('jsonwebtoken')
const passportJWT = require('passport-jwt')
const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy

const userController = {
  async logIn(req, res, next) {
    try {
      // console.log(req.body)
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
      // return res.json({
      //   status: 'success',
      //   message: 'ok',
      //   token: token,
      //   user: {
      //     id: user.id,
      //     name: user.name,
      //     email: user.email
      //   }
      // })
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
