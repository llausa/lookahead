const mongoose = require('mongoose')
const { TaskSchema } = require('./task')
const { UserModel } = require('./user')
const Joi = require('@hapi/joi')
      .extend(require('@hapi/joi-date'))
Joi.objectId = require('joi-objectid')(Joi)


const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true},
    create_date: {type: Date, default: Date.now() },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    location: { type: String, required: true },
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

function validateProject (project) {
  const schema = Joi.object({
      title: Joi.string().required(),
      create_date: Joi.date().iso(),
      start_date: Joi.date().iso().required(),
      end_date: Joi.date().iso().greater(Joi.ref('start_date')).required(),
      location: Joi.string().required(),
      owner: Joi.objectId().required()
  })

  return schema.validate(project)
}

module.exports = { ProjectModel, validateProject }