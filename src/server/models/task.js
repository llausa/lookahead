const mongoose = require("mongoose")
const Joi = require('@hapi/joi')



const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true  },
  start_time: { type: Number, required: true, min: 0, max: 23 },
  length: { type: Number, required: true, min: 1, max: 24 },
  day: { type: Number, required: true, min: 0},
  description: { type: String },
  complete: { type: Boolean, default: false }
})


function validateTask (task, projectDays) {


  const schema = Joi.object({
      title: Joi.string().required(),
      start_time: Joi.number().min(0).max(23).required(),
      length: Joi.number().min(1).max(24).required(),
      day: Joi.number().min(0).max(projectDays - 1).required(),
      description:  Joi.string(),
      complete: Joi.boolean()
  })

  return schema.validate(task)

}

module.exports = { TaskSchema, validateTask }