const jwt = require('jsonwebtoken')
const { UserModel } = require('../models/user')

module.exports = function (req, res) {

  let data = res.locals

  token = res.locals.validUser.generateAuthToken()

  delete data.validUser

  res.cookie('authToken', token, { maxAge: 3600000, domain: "netlify.com", secure: true, sameSite: "None" }) //secure: true, sameSite: "None"

  res.json( data )

}