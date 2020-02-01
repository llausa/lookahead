const { ProjectModel, validateProject } = require('../models/project')
const { UserModel, addProject } = require('../models/user')
const _  = require('lodash')

async function allProjects (req, res) {
  req.body.owner = req.user._id
  let validUser = await UserModel.findById(req.user._id)
  if (!validUser) return res.status(400).json({"message": 'Critical Error: User does not exist in the database'})

  res.status(200).json({"projects": (validUser.projects)})
}

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

  res.status(201).json({"id": project._id, "message":'Project successfully created.'})

}

async function update (req, res) {

}

async function remove (req, res) {

}

async function updateUser (req, res) {

}



async function addUser (req, res) {
  req.body.owner = req.user._id

  // console.log(req.params.projectId)
  let role = req.body.role
  let id = req.body.user

  await ProjectModel.findById((req.params.projectId),
  async function (err, project) {
    project.users.push({
      role, user : id
    })
    await project.save()
  })


  await addProjectToUser(id, req.params.projectId, role)
  // if (!updatedUser) return res.status(404).json({"message": "Project could not be added to user."})

  res.status(200).json("User added to Project Successfully.")
}

async function removeUser (req, res) {
  res.send('yeet')
}


async function addProjectToUser (id, project, role) {

  console.log(`${id}, ${project}, ${role}`)

  await UserModel.findById(id)
  .then(async (user) =>  {

    user.projects.push({
      role, project
    })

    await user.save()

  })
  // return 'Project successfully added to User'
}

module.exports = { create, update, remove, updateUser, removeUser, addUser, allProjects }
