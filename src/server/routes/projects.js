const express = require("express")
const router = express.Router()
const Joi = require('@hapi/joi')
      .extend(require('@hapi/joi-date'))
Joi.objectId = require('joi-objectid')(Joi)
const auth = require('../middleware/auth')
const projectController = require("../controllers/projectController")
const taskController = require("../controllers/taskController")

// Projects list route
router.get("/", auth, projectController.allProjects)

// Project view route
router.get("/:projectId", auth, projectController.getProject)

// create Project route
router.post("/", auth, projectController.create )

// update Project route
router.put("/:projectId", auth, projectController.update)

// delete Project route
router.delete("/:projectId", auth, projectController.remove )

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

// Project add any user role to a project
router.post("/:projectId/users", auth, projectController.addUser )

// Remove User from Project
router.delete("/:projectId/users/:userId", auth, projectController.removeUser )

router.put("/:projectId/users", auth, projectController.updateUser )

router.put("/:projectId/tasks", auth, taskController.createTask )

router.delete("/:projectId/tasks", auth, taskController.removeTask )

router.put("/:projectId/tasks/:taskId", auth, taskController.updateTask )

module.exports = router