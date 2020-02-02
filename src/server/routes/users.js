
const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const userController = require('../controllers/userController')
const { UserModel, validateUser } = require('../models/user')

// Get current user details
router.get('/details', auth, userController.details) // works

// Register User
router.post('/', userController.register) // works

// Update User email
router.put('/email', auth, userController.updateEmail)
// Update User details
router.put('/details', auth, userController.updateDetails) // not validating body of request atm giving error on console
// Update User password
router.put('/password', auth, userController.updatePassword)

module.exports = router