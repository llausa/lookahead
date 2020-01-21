const passport = require("passport")
const UserModel = require("../models/user")
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt")

passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await UserModel.findById(id)
        done(null, user)
    } catch (error) {
        done(error)
    }
})

console.log(process.env.JWT_SECRET)

passport.use(new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
    },
    async (jwt_payload, done) => {
        const user = await UserModel.findById(jwt_payload.sub)
            .catch(done)

        if (!user) {
            return done(null, false)
        }

        return done(null, user)
    }
))