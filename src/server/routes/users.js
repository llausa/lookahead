
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

// Update User details
router.put('/details', auth, userController.updateDetails) // not validating body of request atm giving error on console
// Update User password
router.put('/password', auth, userController.updatePassword) // see slack - we're not handling body with wrong data correctly
// Update User email
router.put('/email', auth, userController.updateEmail) // works

module.exports = router