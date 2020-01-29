const { UserModel, validateUser} = require('../models/user')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const _ = require('lodash')
const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const auth = require('../middleware/auth')

// Get current user
router.get('/me', auth, async (req, res) => {
  const user = await UserModel.findById(req.user._id).select('-password')
  res.send(user)
})

router.post('/', async (req, res) => {
  const { error } = validateUser(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  let user = await UserModel.findOne({ email: req.body.email })
  if(user) return res.status(400).send('An account already exists with that email.')

  user = new UserModel(_.pick(req.body, ['firstName',
                                    'lastName',
                                    'email',
                                    'password',
                                    'position'
                                  ]))
  const salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(user.password, salt)
  await user.save()

  const token = user.generateAuthToken()

  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'firstName', 'lastName', 'email']))
})

module.exports = router