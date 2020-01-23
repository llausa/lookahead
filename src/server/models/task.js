const mongoose = require("mongoose")

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true  },
  start_time: { type: Number, required: true },
  length: { type: Number, required: true },
  day: { type: Number, required: true }
})

module.exports = TaskSchema