const mongoose = require('mongoose')
const TaskSchema = require('./task')
const { UserModel } = require('./user')

const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true},
    create_date: {type: Date, required: true, default: Date.now() },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    //Store Timezone as number +/- GMT?
    timezone: { type: Number, required: true, min: -12, max: 14 },
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

function validateProject(project) {
  const schema = Joi.Object({
      title: Joi.string().required(),
      create_date: Joi.date().iso().required(),
      start_date: Joi.date().iso().required(),
      end_date: Joi.date().iso().greater(Joi.ref('startDate')).required(),
      timezone: Joi.number().min(-12).max(14).required(),
      owner: Joi.objectId().required()
  })

  return schema.validate(project)
}

module.exports = { ProjectModel, validateProject }