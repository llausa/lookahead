const mongoose = require("mongoose")

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true  },
  start_time: { type: Number, required: true, min: 0, max: 23 },
  length: { type: Number, required: true, min: 1, max: 24 },
  day: { type: Number, required: true, min: 0 },
  description: { type: String },
  complete: { type: Boolean, default: false }
})

module.exports = TaskSchema