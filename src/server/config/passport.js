const passport = require("passport")
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt")
const UserModel = require("../models/schemas/user")


// console.log(process.env.JWT_SECRET)

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
},
async (jwt_payload, done) => {
    try{
        const user = await UserModel.findById(jwt_payload.sub)

        if (!user) {
            return done(null, false)
        }

        return done(null, user)           
    } catch (error) {
        return done(error)
    }
}
))

module.exports = passport