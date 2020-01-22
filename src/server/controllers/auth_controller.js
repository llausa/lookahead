const passport = require('passport')
const UserModel = require('../models/schemas/user')

function register(req, res, next) {
    const { email, password, firstName, lastName } = req.body
    const user = new UserModel({ email, firstName, lastName })


    UserModel.register(new User(user, req.body.password, (err, user) => {
        if (err) {
            if(err.name === 'UserExistsError') {
                res.status(409)
                res.json({
                    error: err.message
                })
            } else {
                res.status(500)
                res.json({
                    error: err
                })
            }
        } else {
            const token = JWTService.generateToken(user);
            return res.json({ token })
        }
    }))
}

const logout = function (req, res) {
    req.logout()
    console.log('logged out user')
    console.log('session object:', req.session)
    console.log('req.user:', req.user)
    res.sendStatus(200)
}


const authenticate = passport.authenticate('local')

function loginUser(req, res) {
    

    authenticate(req, res, function () {
        console.log('authenticated', req.user.username)
        console.log('session object:', req.session)
        console.log('req.user:', req.user)
        res.status(200)
        res.json({user: req.user, sessionID: req.sessionID})
    })
}

function activeUserSession(req,res) {
    if(req.sessionID && req.user) {
        res.status(200)
        res.send(req.sessionID)
    }
    else {
        res.sendStatus(403)
    }    
}

module.exports = {
    register,
    login: loginUser,
    logout,
    activeUserSession
}