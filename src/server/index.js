const express = require("express")
const mongoose = require('mongoose')
const Joi = require('joi')
const morgan = require('morgan')
const cors = require('cors')
const auth = require('./routes/auth')
const lookaheads = require("./routes/lookaheads")
const home = require("./routes/home")
const users = require("./routes/users")

const app = express();
mongoose.connect('mongodb://localhost/lookahead')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('tiny'))
app.use("/api/lookaheads", lookaheads)
app.use("/", home)
app.use("/api/users", users)
app.use('/api/auth', auth)

const port = process.env.PORT || 3000;

app.use(cors({
  credentials: true,
  origin: function (origin, callback) {
      callback (null, true)
  }
}))

app.listen(port, () => console.log(`Example app listening on port ${port}!`));