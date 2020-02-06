const { ProjectModel, validateProject } = require('../models/project')
const { UserModel, addProject } = require('../models/user')
const _  = require('lodash')

// GET Projects
async function allProjects (req, res, next) {

  // Fetch User Object from db
  let validUser = await UserModel.findById(req.user._id)
  .catch( (err) => { return res.status(404).json({ "message": err.message })})

  // Fetch Project Refs from User Object
  let userProjs = validUser.projects.map(project => project.project)

  // Uses Project Refs to find the Project Objects
  let projObjs = await ProjectModel.find({ _id: { $in: userProjs } })

  // Specifies the response for the request is successful and sets response data.
  res.status(200)
  res.locals.validUser = validUser
  res.locals.projects = projObjs

  next()

}

// POST Project
async function create (req, res, next) {

  req.body.owner = req.user._id

  // Validate Request Data to ensure it matches db structure
  const { error } = validateProject(req.body)
  if (error) return res.status(400).json({"message": error.details[0].message })

  // Fetch User Object from db
  let validUser = await UserModel.findById(req.user._id)
  .catch( (err) => { return res.status(404).json({ "message": err.message })})

  // Sets the request sender to be the owner of the project created
  req.body.owner = validUser._id

  // Creates a Project in the db using the request data
  let project = new ProjectModel(_.pick(req.body, ['title', 'create_date', 'start_date', 'end_date', 'owner', 'location']))
  await project.save()

  // Calls a function which adds the Project to the User's model as a reference
  await addProjectToUser(validUser._id, project._id, 'Owner')

  // Specify the response for the request is successful and response data.
  res.status(201)
  res.locals.validUser = validUser
  res.locals.id = project._id
  res.locals.message = "Project successfully created."

  next()

}

// GET Project
async function getProject (req, res, next) {


   // Fetch User Object from db
  let validUser = await UserModel.findById(req.user._id)
  .catch( (err) => { return res.status(404).json({ "message": err.message })})


   // Fetch Project Object from db
  let validProject = await ProjectModel.findById((req.params.projectId))
  .catch( (err) => { return res.status(404).json({ "message": err.message })})

  // If the users is part of the project, grab that user ref.
  let userInProject = validProject.users.find(element => element.user == validUser._id)

  // Check to see if the User is authorised to see this project
  if ((validUser._id == String(validProject.owner)) || userInProject ) {

    // Specify the response for the request is successful and response data.
    res.status(200)
    res.locals.validUser = validUser
    res.locals.validProject = validProject

    next()

  } else {
    // User not authorized - return 401.
    res.status(401).json({"message": "You're not authorized to see this project."})
  }
}

// UPDATE Project
async function update (req, res, next) {

  // Add user to the project request
  req.body.owner = req.user._id

  // Fetch the User from the DB
  let validUser = await UserModel.findById(req.user._id)
  .catch( (err) => { return res.status(404).json({ "message": err.message })})

  // Fetch the project from the db
  let validProject = await ProjectModel.findById((req.params.projectId))
  .catch( (err) => { return res.status(404).json({ "message": err.message })})

  // Prevent projects from getting shortened.
  if (validProject.end_date.getDate() >= Date.parse(req.body.end_date)) {
    return res.status(400).json({"message": "Project can't be shortened."})
  }

  // Attach the updated details to the Valid Project object
  validProject.title = req.body.title
  validProject.end_date = req.body.end_date
  validProject.location = req.body.location

  // Validate the new Project details
  let { err } = validateProject(validProject)
  if (err) return res.status(400).json({"message": "Project details are not correct."})

  // Ensure user is authorised
  if (validUser._id == String(validProject.owner)) {
    await validProject.save()

    // Specify the response for the request is successful and response data.
    res.status(200)
    res.locals.validUser = validUser
    res.locals.message = "Project details successfulyl updated"

    next()

  } else {
    // Unauthorized
    res.status(401).json({"message": "You're not authorized to see this project."})
  }
}

// DELETE project
async function remove (req, res, next) {

  // Fetch the valid user
  let validUser = await UserModel.findById(req.user._id)
  .catch( (err) => { return res.status(404).json({ "message": err.message })})

  // Fetch the valid project
  let validProject = await ProjectModel.findById((req.params.projectId))
  .catch( (err) => { return res.status(404).json({ "message": err.message })})

  // Check authorisation
  if (validUser._id == String(validProject.owner)) {

    // Remove the project ref from each of the project users
    for ( let user of validProject.users ) {
      await removeProjectFromUser(user.user, req.params.projectId)
    }

    // Remove the project
    ProjectModel.findByIdAndRemove(req.params.projectId, async (err, project) => {

    if (err) return res.status(404).json({"message": err})

    
    // Send response
    res.status(200)
    res.locals.validUser = validUser
    res.locals.message = "Project successfully deleted."

    next()

  })
  } else {
    res.status(401).json({"message": "You're not authorized to see this project."})
  }


}

// Get Users of Project
async function usersInProject (req, res, next) {


  let validUser = await UserModel.findById(req.user._id)
  .catch( (err) => { return res.status(404).json({ "message": err.message })})

  let validProject = await ProjectModel.findById((req.params.projectId))
  .catch( (err) => { return res.status(404).json({ "message": err.message })})

  if (validUser._id == String(validProject.owner)) {

    // Find the user Refs in the project
    let projUsers = validProject.users.map(user => user.user)
    projUsers.push(validProject.owner)

    // Find the user objects based on the refs
    let usersObjs = await UserModel.find({ _id: { $in: projUsers } })
    .catch( (err) => { return res.status(404).json({ "message": err.message })})

    res.status(200)
    res.locals.validUser = validUser
    res.locals.users = usersObjs

    next()

  } else {
    res.status(401).json({"message": "You're not authorized to see this project."})
  }
}

// Get users not in project
async function usersNotInProject (req, res, next) {

  req.body.owner = req.user._id

  let validUser = await UserModel.findById(req.user._id)
  .catch( (err) => { return res.status(404).json({ "message": err.message })})

  let validProject = await ProjectModel.findById((req.params.projectId))
  .catch( (err) => { return res.status(404).json({ "message": err.message })})


  if (validUser._id == String(validProject.owner)) {

    // Find the user refs in the project
    let projUsers = validProject.users.map(user => user.user)
    projUsers.push(validProject.owner)

    // Get the user objs of those NOT in the project.
    let usersObjs = await UserModel.find({ _id: { $nin: projUsers } })
    .catch( (err) => { return res.status(404).json({ "message": err.message })})

    res.status(200)
    res.locals.validUser = validUser
    res.locals.users = usersObjs
    next()

  } else {
    res.status(401).json({"message": "You're not authorized to see this project."})
  }
}

// Update User Role
async function updateUser (req, res, next) {

  let validUser = await UserModel.findById(req.user._id)
  .catch( (err) => { return res.status(404).json({ "message": err.message })})

  let validProject = await ProjectModel.findById((req.params.projectId))
  .catch( (err) => { return res.status(404).json({ "message": err.message })})

  let changingUser = validProject.users.find(element => element.user == req.params.userId)
  if (!changingUser) {
    return res.status(404).json({"message":'That user does not exist.'})
  }

  if (validUser._id == String(validProject.owner)) {
  changingUser.role = req.body.role
  await validProject.save()

  await updateUserRoleInProject(changingUser.user, req.params.projectId, req.body.role)

  res.status(200)
  res.locals.validUser = validUser
  res.locals.message = "User updated successfully."

  next()

  } else {
    res.status(401).json({"message": "You're not authorized to update this project."})
  }



}
// Add User to Project
async function addUser (req, res, next) {

  let validUser = await UserModel.findById(req.user._id)
  .catch( (err) => { return res.status(404).json({"message": err.message }) })

  req.body.owner = req.user._id

  let role = req.body.role
  let id = req.body.user

  await ProjectModel.findById((req.params.projectId),
  async function (err, project) {
    project.users.push({
      role, user : id
    })
    await project.save()

  })
  .catch( (err) => { return res.status(404).json({"message": err.message }) })

  await addProjectToUser(id, req.params.projectId, role)

  res.status(200)
  res.locals.validUser = validUser
  res.locals.message = "User added to Project Successfully."

  next()

}

// Remove User from Project
async function removeUser (req, res, next) {

  let validUser = await UserModel.findById(req.user._id)
  .catch( (err) => { return res.status(404).json({"message": err.message }) })

  let validProject = await ProjectModel.findById((req.params.projectId))
  .catch( (err) => { return res.status(404).json({"message": err.message }) })


  if (validUser._id == String(validProject.owner)) {

    let oldmate = validProject.users.find(element => element.user == req.params.userId)

    const {error} = validProject.users.pull(oldmate._id)
    if (error) return res.status(404).end(error.details[0].message)

    await validProject.save()

    await removeProjectFromUser(oldmate.user, req.params.projectId)

    res.status(200)
    res.locals.validUser = validUser
    res.locals.message = "User removed successfully."

    next()
  }
  else {
    res.status(401).json({"message": "You're not authorized to update this project."})
  }
}

// Remove Project from User
async function updateUserRoleInProject (userId, projectId, role) {

  let user = await UserModel.findById(userId)
  .catch( (err) => { return res.status(404).json({ "message": err.message })})

  let oldmate = user.projects.find(element => element.project == projectId)

  oldmate.role = role

  await user.save()

}
async function removeProjectFromUser (userId, projectId) {
  let user = await UserModel.findById(userId)
  .catch( (err) => { return res.status(404).json({ "message": err.message })})

  let oldmate = user.projects.find(element => element.project == projectId)

  user.projects.pull(oldmate._id)

  await user.save()
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

module.exports = { create, update, remove, updateUser, usersInProject, removeUser, addUser, allProjects, getProject, usersNotInProject }
