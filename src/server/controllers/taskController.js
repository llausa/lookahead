const { TaskSchema, validateTask } = require("../models/task")
const { ProjectModel } = require("../models/project")
const _ = require("lodash")




async function createTask (req, res) {

  let task = req.body

  const { error } = validateTask(task)
  if (error) return res.status(400).send(error.details[0].message)


  let validProject = await ProjectModel.findById(req.params.projectId)

  if (!validProject) {
    return res.status(400).send('That project does not exist.')
  }

  validProject.tasks.push(task)
  await validProject.save()
 
  res.status(201).json({message:'Task successfully created.'})

}

async function updateTask (req, res) {
  res.send('yeet')
}

async function removeTask (req, res) {
  res.send('yeet')
}

module.exports = { createTask, updateTask, removeTask }