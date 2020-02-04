const { UserModel } = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const Joi = require('@hapi/joi')

async function login(req, res, next) {
  const { error } = validate(req.body)
  if (error) return res.status(400).json(error.details[0].message)

  let user = await UserModel.findOne({ email: req.body.email })
  if(!user) return res.status(401).json({"message":"Invalid Email or Password."})

  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if (!validPassword) return res.status(401).json({"message":"Invalid Email or Password."})

  // const token = user.generateAuthToken()
  res.status(200)
  res.locals.validUser = user
  // res.json({"token": token})
  next()
}

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  })
  return schema.validate(req)
}

module.exports = { login }