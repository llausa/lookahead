const mongoose = require('mongoose')
const TaskSchema = require('./task')
const { UserModel } = require('./user')

const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true},
    create_date: {type: Date, required: true, default: Date.now() },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    //Store Timezone as number +/- GMT?
    timezone: { type: Number, required: true, min: -12, max: +14 },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    tasks: [TaskSchema],
    users: [
      {
        role: { type: String, required: true },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        }
      }
    ]
})

const ProjectModel = new mongoose.model('Project', ProjectSchema)

module.exports = ProjectModel