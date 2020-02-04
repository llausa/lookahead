const mongoose = require('mongoose')
const Joi = require('@hapi/joi')
const jwt = require('jsonwebtoken')
const uniqueValidator = require('mongoose-unique-validator')

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,1024}$/

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

UserSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({exp: Math.floor(Date.now() / 1000) + (60 * 60), _id: this._id }, process.env.JWT_SECRET)
    return token
}

UserSchema.plugin(uniqueValidator)
const UserModel = mongoose.model('User', UserSchema)

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
