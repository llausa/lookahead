const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  start_time: { 
    type: Number, 
    required: true 
  },
  length: { 
    type: Number, 
    required: true 
  },
  day: { 
    type: Number, 
    required: true 
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  date_created: {
    type: Date,
    required: true
  },
  last_edited: {
    type: Date
  },
  edited_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
})

module.exports = TaskSchema