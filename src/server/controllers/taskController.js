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



  let validProject = await ProjectModel.findById(req.params.projectId)
  if (!validProject) {
    return res.status(400).send('That project does not exist.')
  }

  let validTask = validProject.tasks.find((val) => val._id = req.params.taskId)


  const { error } = validateTask(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  validTask.title = req.body.title
  validTask.start_time = req.body.start_time
  validTask.length = req.body.length
  validTask.day = req.body.day
  validTask.description = req.body.description

  await validProject.save()

  res.status(200).json({message:'Task successfully updated.'})

}

async function removeTask (req, res) {

  let validProject = await ProjectModel.findById(req.params.projectId)
  if (!validProject) {
    return res.status(400).send('That project does not exist.')
  }

  const {error} = await validProject.tasks.pull(req.params.taskId)
  if (error) return res.status(400).end(error.details[0].message)

  await validProject.save()
  res.status(200).json({"message": "Task successfully deleted."})

}

module.exports = { createTask, updateTask, removeTask }