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

  checkOverlap(task, validProject)
  if (!checkOverlap) {
    return res.status(400).send('Tasks cannot overlap.')
  }

  if ((task.start_time + task.length) > 24) {

    let overlap = ((parseInt(task.start_time) + parseInt(task.length)) - 24)

    let splitTask = Object.assign({}, task)
    splitTask.length = overlap
    splitTask.day += 1

    task.length -= overlap

    validProject.tasks.push(task, splitTask)
    await validProject.save()
  
    res.status(201).json({message:'Tasks successfully created.'})

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


  checkOverlap(validTask, validProject)
  if (!checkOverlap) {
    return res.status(400).send('Tasks cannot overlap.')
  }

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

function checkOverlap (task, project) {

  console.log('task', task)
  console.log('project', project)

  taskStart = new Date(0, 0, task.day, task.start_time)
  taskFinish = new Date(0, 0, task.day, task.start_time + task.length)

  for(let projTask of project.tasks) {
    projTaskStart = new Date(0, 0, projTask.day, projTask.start_time)
    projTaskFinish = new Date(0, 0, projTask.day, projTask.start_time + projTask.length)
    if(
      (taskStart > projTaskStart && taskStart < projTaskFinish) ||
      (taskFinish > projTaskStart && taskFinish < projTaskFinish)
    ) {
      return false
    }
  }
  return true

}

module.exports = { createTask, updateTask, removeTask }