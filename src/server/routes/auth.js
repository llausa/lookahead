const { UserModel } = require('../models/user')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const _ = require('lodash')
const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const refreshAuth = require('../middleware/refreshAuth')


// Login
router.post('/', authController.login, refreshAuth)


module.exports = router