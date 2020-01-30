
const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const userController = require('../controllers/userController')

// Get current user
router.get('/me', auth, async (req, res) => {
  const user = await UserModel.findById(req.user._id).select('-password')
  res.send(user)
})
// Register User
router.post('/', userController.register)


module.exports = router