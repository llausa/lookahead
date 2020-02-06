const { UserModel, validateUser, validateEmail, validatePassword } = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const _ = require('lodash')

// Get User Details route Logic
async function details(req, res, next) {
  // Tries to grab user with req Id and return 404 if no valid user found
  const user = await UserModel.findById(req.user._id).select('-password -email')
  .catch( (err) => { return res.status(404).json({ "message": err.message })})

  res.status(200)
  res.locals.user = user
  res.locals.validUser = user
  next()
}

// Register User Route Logic
async function register(req, res, next) {
  // Tries to grab user with req Id and return 404 if no valid user found
  const { error } = validateUser(req.body)
  if (error) return res.status(400).json({"message": 'Invalid user data.'})
  // Grab User Object based on email
  let user = await UserModel.findOne({ email: req.body.email })
  if (user) return res.status(409).json({"message": "An account already exists with that email."})

  // Create new user object and hashes the password before save on line 35
  user = new UserModel(_.pick(req.body, ['firstName',
                                    'lastName',
                                    'email',
                                    'password',
                                    'position'
                                  ]))
  const salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(user.password, salt)
  await user.save()

  res.status(201)
  res.locals.validUser = user
  res.locals.message = `User ${user.email} successfully created.`

  next()
}

// Update User Details Route Logic
async function updateDetails(req, res, next) {

  let validUser = await UserModel.findById(req.user._id)
  .catch( (err) => { return res.status(404).json({ "message": err.message })})

  if (!req.body.firstName || !req.body.lastName || !req.body.position ) {
    return res.status(400).json({"message": "Invalid user data."})
  }

  validUser.firstName = req.body.firstName
  validUser.lastName = req.body.lastName
  validUser.position = req.body.position

  await validUser.save()

  res.status(200)
  res.locals.validUser = validUser
  res.locals.message = "Account Details Successfully Updated"

  next()

}

// Update User Password Route Logic
async function updatePassword(req, res, next) {
  // Tries to grab user with req Id and return 404 if no valid user found
  let validUser = await UserModel.findById(req.user._id)
  .catch( (err) => { return res.status(404).json({ "message": err.message })})
  // Validates password attached to user and return 400 if invalid
  const { error } = validatePassword({password: req.body.newPassword})
  if (error) return res.status(400).json({"message": 'Invalid password.'})
  // Compares password provided to stored password
  const validPassword = await bcrypt.compare(req.body.currentPassword, validUser.password)
  if (!validPassword) return res.status(401).json({"message":"Invalid Email or Password."})
  // Hashes new password
  const salt = await bcrypt.genSalt(10)
  validUser.password = await bcrypt.hash(req.body.newPassword, salt)
  // Saves new password
  await validUser.save()
  res.status(200)
  res.locals.validUser = validUser
  res.locals.message = "Password updated succesfully."

  next()
}

// Update User Email Route Logic
async function updateEmail(req, res, next) {

  let validUser = await UserModel.findById(req.user._id)
  .catch( (err) => { return res.status(404).json({ "message": err.message })})

  let error = validateEmail({email: req.body.email}).error
  if (error) return res.status(400).json({"message": 'Email address must be a valid email.'})

  error = validatePassword({password: req.body.password}).error
  if (error) return res.status(400).json({"message": 'Incorrect Password.'})

  const validPassword = await bcrypt.compare(req.body.password, validUser.password)
  if (!validPassword) return res.status(400).json({"message":'Incorrect Password'})

  let user = await UserModel.findOne({ email: req.body.email })
  if(user) return res.status(409).json({"message": "An account already exists with that email."})

  validUser.email = req.body.email

  await validUser.save()

  res.status(200)
  res.locals.validUser = validUser
  res.locals.message = "Email updated successfully."

  next()
}

module.exports = { register, updateDetails, updatePassword, updateEmail, details }