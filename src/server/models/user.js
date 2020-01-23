const mongoose = require('mongoose');

// Create a simple User's schema 
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true},
    lastName: {type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true},
    position: { type: String, default: "worker"}
});

const userModel = new mongoose.model('User', userSchema);


module.exports = userModel