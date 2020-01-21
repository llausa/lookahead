const passport = require('passport');
const User = require('../models/user');

const register = function (req, res) {
    User.register(new User({
        email: req.body.email,
        position: req.body.position || 'worker',
        firstName: req.body.firstName,
        lastName: req.body.lastName
    }), req.body.password, function (err) {
        if (err) {
            console.log(err)
            if(err.name === 'UserExistsError') {
                res.status(409)
                res.json({
                    error: err.message
                });
            } else {
                res.status(500);
                res.json({
                    error: err
                });
            }
        } else {
            loginUser(req, res);
        }
    });
};

const logout = function (req, res) {
    req.logout();
    console.log('logged out user');
    console.log('session object:', req.session);
    console.log('req.user:', req.user);
    res.sendStatus(200);
}

// helper functions
const authenticate = passport.authenticate('local');

function loginUser(req, res) {
    // passport.authenticate returns a function that we will call with req, res, and a callback function to execute on success    

    authenticate(req, res, function () {
        console.log('authenticated', req.user.username);
        console.log('session object:', req.session);
        console.log('req.user:', req.user);
        res.status(200);
        res.json({user: req.user, sessionID: req.sessionID});
    });
}

function activeUserSession(req,res) {
    if(req.sessionID && req.user) {
        res.status(200);
        res.send(req.sessionID)
    }
    else {
        res.sendStatus(403);
    }    
}

module.exports = {
    register,
    login: loginUser,
    logout,
    activeUserSession
};