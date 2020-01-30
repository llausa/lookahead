const { ProjectModel, validateProject } = require('../models/project')
const { UserModel, addProject } = require('../models/user')
const _  = require('lodash')

async function create(req, res) {
  req.body.owner = req.user._id
  const { error } = validateProject(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  let validUser = await UserModel.findById(req.user._id)

  if (!validUser) {
    return res.status(400).send('Critical Error: User does not exist in the database')
  }

  let project = new ProjectModel(_.pick(req.body, ['title', 'create_date', 'start_date', 'end_date', 'timezone', 'owner']))
  await project.save()

  addProjectToUser(validUser._id, project._id, 'Owner')

  res.status(201).json({message:'Project successfully created.'})

}

async function addProjectToUser(id, project, role) {
  await UserModel.findById(id, async (err, user) => {
    user.projects.push({
      role, project
    })
    await user.save()
    console.log(user)
    console.log(project._id)

  })
  
}

module.exports = { create }