const { UserModel } = require('../models/user')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const _ = require('lodash')
const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

router.post('/', authController.login)


module.exports = router