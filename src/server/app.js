
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require("connect-mongo")(session)
const passport = require('passport')
const morgan = require('morgan')
const authRouter = require('./routes/auth_routes')
require('dotenv').config()


const port = process.env.PORT || 3000

const app = express()


app.use(cors({
  credentials: true,
  origin: function (origin, callback) {
      callback (null, true)
  }
}))

app.use(bodyParser.json())
app.use(session({
  secret: "Express is awesome",
  resave: false,
  saveUninitialized: false,
  cookie: {
      maxAge: 1800000
  },
  store: new MongoStore({
      mongooseConnection: mongoose.connection
  })
}))

require('./config/passport');
app.use(passport.initialize());


app.use(morgan('common'));

app.get('/', (req, res) => {
    console.log('get on /');
    console.log('req.session', req.session)
    res.send('got your request');
})

app.use(authRouter)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))