const User = require('../models/user.js')

const userController = {
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
