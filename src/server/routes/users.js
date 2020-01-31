
const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const userController = require('../controllers/userController')
const { UserModel, validateUser } = require('../models/user')

// Get current user
router.get('/me', auth, async (req, res) => {
  const user = await UserModel.findById(req.user._id).select('-password')
  res.send(user)
})

// Register User
router.post('/', userController.register)

// Update User details
router.put('/details', auth, userController.updateDetails)

module.exports = router