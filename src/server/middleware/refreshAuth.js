const jwt = require('jsonwebtoken')
const { UserModel } = require('../models/user')

module.exports = function (req, res) {

  let data = res.locals

  token = res.locals.validUser.generateAuthToken()

  delete data.validUser

  data.token = token
  
  res.json( data )

}