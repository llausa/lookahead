const mongoose = require('mongoose')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const uniqueValidator = require('mongoose-unique-validator')

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
        match: [/^[A-z_\-.0-9+]+@[A-z_0-9]+?\.[A-z]{2,4}$/, 'Please fill a valid email address'],
        minlength: 6,
        maxlength: 255
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
                role: { type: String, required: true },
                project: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Project"
                }
            }
        ]
})

UserSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET)
    return token
}

UserSchema.plugin(uniqueValidator)
const UserModel = mongoose.model('User', UserSchema)

function validateUser(user) {
    const schema = {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
        position: Joi.string()
    }
    return Joi.validate(user, schema)
}

module.exports = { UserModel, validateUser }
