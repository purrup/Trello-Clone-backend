const passport = require('passport')
const User = require('../models/user.js')
// const bcrypt = require('bcrypt')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
    },
    async (jwtPayload, done) => {
      try {
        const user = await User.findById(jwtPayload.id)
        if (!user) return done(null, false)
        return done(null, user)
      } catch (error) {
        console.log(error)
        return done(error, false)
      }
    }
  )
)

module.exports = passport
