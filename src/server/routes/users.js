
const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const refreshAuth = require('../middleware/refreshAuth')
const userController = require('../controllers/userController')
const { UserModel, validateUser } = require('../models/user')

// Get current user details
router.get('/details', auth, userController.details, refreshAuth) // works

// Register User
router.post('/', userController.register, refreshAuth) // works

// Update User email
router.put('/email', auth, userController.updateEmail, refreshAuth) // works

// Update User details
router.put('/details', auth, userController.updateDetails, refreshAuth) // works
// Update User password
router.put('/password', auth, userController.updatePassword, refreshAuth) // works

module.exports = router