require('dotenv').config()
// require('./models/connect.js')
const express = require("express")
const mongoose = require('mongoose')
const Joi = require('@hapi/joi')
const morgan = require('morgan')
const cors = require('cors')
const auth = require('./routes/auth')
const projects = require("./routes/projects")
const home = require("./routes/home")
const users = require("./routes/users")
const bodyParser = require("body-parser")

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

if (process.env.NODE_ENV == 'production') {
  mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
  .then(mongoose.connection
    .once('open', () => {
      console.log('Connected')
    })
    .on('error', (error) => {
        console.warn('Error : ', error)
    }))
  .catch(err => console.error('Could not connect to MongoDB...', err))
}
else if (process.env.NODE_ENV == 'test') {
  mongoose.connect('mongodb://localhost/lookahead-test', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
  .then(mongoose.connection
    .once('open', () => {
      console.log('Connected to the Test Database')
    }
    )
    .on('error', (error) => {
        console.warn('Error : ',error)
    }))
  .catch(err => console.error('Could not connect to MongoDB...', err))
}
else {
  mongoose.connect('mongodb://localhost/lookahead', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
  .then(() => console.log('Connected to Development Database...'))
  .catch(err => console.error('Could not connect to MongoDB...', err))
}

if (!process.env.JWT_SECRET) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.')
  process.exit(1)
}

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('tiny'))

app.use("/", home)
app.use("/api/projects", projects)
app.use("/api/users", users)
app.use('/api/auth', auth)

const port = process.env.PORT || 3001



app.listen(port, () => console.log(`listening on port ${port}!`))

module.exports = app