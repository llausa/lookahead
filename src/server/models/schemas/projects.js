const mongoose = require("mongoose")
const TaskSchema = require("./tasks")
const Schema = mongoose.Schema;


const ProjectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    create_date: {
        type: Date,
        required: true
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    tasks: [TaskSchema],
    users: [
      { 
        role: {
          type: String,
          required: true
        },
        user: { 
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        }
      }
    ]
})

module.exports = mongoose.model("Project", Project);