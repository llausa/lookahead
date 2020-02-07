const { UserModel } = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const Joi = require('@hapi/joi')

// LOGIN Request
async function login(req, res, next) {

  // Validate Request Data to ensure it matches db structure
  const { error } = validate(req.body)
  if (error) return res.status(400).json({"message": error.details[0].message })  

  // Fetch User Object from db
  let user = await UserModel.findOne({ email: req.body.email })
  if(!user) return res.status(401).json({"message":"Invalid Email or Password."})

  // Validate password with Stored password
  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if (!validPassword) return res.status(401).json({"message":"Invalid Email or Password."})

  // Specify the response for the request is successful and response data.
  res.status(200)
  res.locals.validUser = user
  res.locals.message = "Logged in successfully."

  next()
}

// Function for Validation of request to ensure it matches db structure using Joi
function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  })
  return schema.validate(req)
}

module.exports = { login }