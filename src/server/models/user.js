const mongoose = require('mongoose')
const Joi = require('@hapi/joi')
const jwt = require('jsonwebtoken')
const uniqueValidator = require('mongoose-unique-validator')

// Email and Password Regex for input validation
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,1024}$/

// User Schema with specifications to other related objects included
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 6,
        maxlength: 255,
        match: emailRegex
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 1024
    },
    position: {
        type: String,
        default: "worker"
    }
    ,
    projects:
        [
            {
                project: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Project"
                },
                role: { type: String, required: true }
            }
        ]
})

// Generates authToken based on the ID of the User Object
UserSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({exp: Math.floor(Date.now() / 1000) + (60 * 60), _id: this._id }, process.env.JWT_SECRET)
    return token
}

// Plugin for Unique email
UserSchema.plugin(uniqueValidator)
// Create User Model in mongoose
const UserModel = mongoose.model('User', UserSchema)

// Validate user creation with the following requirements
function validateUser(user) {
    const schema = Joi.object({
        firstName: Joi.string()
                        .required(),
        lastName: Joi.string()
                        .required(),
        email: Joi.string()
                        .min(6)
                        .max(255)
                        .required()
                        .email()
                        .pattern(emailRegex),
        password: Joi.string()
                        .min(8)
                        .max(255)
                        .required()
                        .pattern(passwordRegex),
        position: Joi.string()
    })
    return schema.validate(user)
}

// Validate Email for the following requirements
function validateEmail(email) {
    const schema = Joi.object({
        email: Joi.string()
                        .min(6)
                        .max(255)
                        .required()
                        .email()
                        .pattern(emailRegex)
    })
    return schema.validate(email)
}

// Validate Password for the following requirements
function validatePassword(password) {
    const schema = Joi.object({
        password: Joi.string()
                        .min(8)
                        .max(255)
                        .required()
                        .pattern(passwordRegex)
    })
    return schema.validate(password)
}

module.exports = { UserModel, validateUser, validateEmail, validatePassword }
