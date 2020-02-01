async function createTask (req, res) {

  let task = req.body

  const { error } = validateTask(task)
  if (error) return res.status(400).send(error.details[0].message)


  let validProject = await ProjectModel.findById(req.params.projectId)

  if (!validProject) {
    return res.status(400).send('That project does not exist.')
  }

  let project = new ProjectModel(_.pick(req.body, ['title', 'create_date', 'start_date', 'end_date', 'timezone', 'owner']))
  await project.save()

  await addProjectToUser(validUser._id, project._id, 'Owner')

  res.status(201).json({message:'Project successfully created.'})

}

a = {"title": "Build House",
	"start_time": 2,
	"length": 4,
	"day": 1,
	"description": "Big Yeet"}

async function updateTask (req, res) {
  res.send('yeet')
}

async function removeTask (req, res) {
  res.send('yeet')
}

module.exports = { createTask, updateTask, removeTask }