const { ProjectModel, validateProject } = require('../models/project')
const { UserModel, addProject } = require('../models/user')
const _  = require('lodash')

async function create (req, res) {
  req.body.owner = req.user._id
  const { error } = validateProject(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  let validUser = await UserModel.findById(req.user._id)

  if (!validUser) {
    return res.status(400).send('Critical Error: User does not exist in the database')
  }

  req.body.owner = validUser._id
  
  let project = new ProjectModel(_.pick(req.body, ['title', 'create_date', 'start_date', 'end_date', 'timezone', 'owner']))
  await project.save()

  await addProjectToUser(validUser._id, project._id, 'Owner')

  res.status(201).json({message:'Project successfully created.'})

}

async function addProjectToUser (id, project, role) {

  await UserModel.findById(id)
  .then(async (user) =>  {

    user.projects.push({
      role, project
    })

    await user.save()

  })
  
}

module.exports = { create }