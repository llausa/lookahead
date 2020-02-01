const express = require("express")
const router = express.Router()
const Joi = require('@hapi/joi')
      .extend(require('@hapi/joi-date'))
Joi.objectId = require('joi-objectid')(Joi)
const auth = require('../middleware/auth')
const projectController = require("../controllers/projectController")
const taskController = require("../controllers/taskController")


const projects = [
  { id: 1, name: "Project1" },
  { id: 2, name: "Project2" },
  { id: 3, name: "Project3" },
  { id: 4, name: "Project4" },
  { id: 5, name: "Project5" },
]


// Projects list route
router.get("/", auth, projectController.allProjects)
// (req, res) => {
//   res.send(projects);
// });

// Project view route
router.get("/:id", auth, (req, res) => {
  const project = projects.find(c => c.id === parseInt(req.params.id))
  if (!project) return res.status(404).send('The project with that ID was not found')


  if (result.error) {
    // 400 Bad Request
    res.status(400).send(result.error.details[0].message)
    return
  }
  res.send(project)
})

// Projects POST route
router.post("/", auth, projectController.create )

router.put("/:projectId/tasks", auth, taskController.createTask )

// Project add any user role to a project
router.post("/:projectId/users", auth, projectController.addUser )

router.put("/:projectId", auth, projectController.update )

router.delete("/:projectId", auth, projectController.remove )

router.delete("/:projectId/tasks", auth, taskController.removeTask )

router.put("/:projectId/tasks/:taskId", auth, taskController.updateTask )

router.delete("/:projectId/users/:userId", auth, projectController.removeUser )

router.put("/:projectId/users", auth, projectController.updateUser )


// project Project PUT route
router.put('/:id', auth, (req, res) => {
  const project = projects.find(c => c.id === parseInt(req.params.id))
  if (!project) return res.status(404).send('The project with that ID was not found')

  const schema = {
    name: Joi.string().min(3).required()
  }
  const result = Joi.validate(req.body, schema)

  if (result.error) {
    // 400 Bad Request
    res.status(400).send(result.error.details[0].message)
    return
  }
  res.send(project)
})

router.delete('/:id', auth, (req, res) => {
  const project = projects.find(c => c.id === parseInt(req.params.id))
  if (!project) return res.status(404).send('The project with that ID was not found')

  const index = projects.indexOf(project)
  projects.splice(index, 1)

  res.send(project)
})

module.exports = router