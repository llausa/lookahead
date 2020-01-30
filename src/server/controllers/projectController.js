const { ProjectModel, validateProject } = require('../models/project')
const _  = require('lodash')

async function create(req, res) {
  const { error } = validateProject(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  let validUser = await UserModel.findById(req.user._id)

  if (!validUser) {
    return res.status(400).send('Critical Error: User does not exist in the database')
  }

  let project = new ProjectModel(_.pick(req.body, ['title', 'create_date', 'start_date', 'end_date', 'timezone', 'owner']))
  await project.save()

  addProject(validUser._id, project._id, 'Owner')

  res.status(201).json({message:'Project successfully created.'})

}

module.exports = { create }