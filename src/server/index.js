require('dotenv').config()
const express = require("express")
const Joi = require('joi')
const morgan = require('morgan')
const cors = require('cors')
const lookaheads = require("./routes/lookaheads")
const home = require("./routes/home")

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('tiny'))
app.use("/api/lookaheads", lookaheads)
app.use("/", home)

const port = process.env.PORT || 3000;

app.use(cors({
  credentials: true,
  origin: function (origin, callback) {
      callback (null, true)
  }
}))

app.listen(port, () => console.log(`Example app listening on port ${port}!`));