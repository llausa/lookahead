
const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const userController = require('../controllers/userController')
const { UserModel, validateUser } = require('../models/user')

// Get current user details
router.get('/details', auth, userController.details)

// Register User
router.post('/', userController.register)

// Update User details
router.put('/details', auth, userController.updateDetails)
// Update User password
router.put('/password', auth, userController.updatePassword)
// Update User email
router.put('/email', auth, userController.updateEmail)

module.exports = router