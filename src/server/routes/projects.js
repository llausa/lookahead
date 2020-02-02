const express = require("express")
const router = express.Router()
const Joi = require('@hapi/joi')
      .extend(require('@hapi/joi-date'))
Joi.objectId = require('joi-objectid')(Joi)
const auth = require('../middleware/auth')
const projectController = require("../controllers/projectController")
const taskController = require("../controllers/taskController")

// Projects list route
router.get("/", auth, projectController.allProjects) // works but if empty, returns empty array

// Project view route
router.get("/:projectId", auth, projectController.getProject) // works if projectId is correct and project exist

// create Project route
router.post("/", auth, projectController.create ) // works correctly, returns project Id and a successful project creation msg

// update Project route
router.put("/:projectId", auth, projectController.update) // works properly if body is correct and Id is correct. Wont work otherwise

// delete Project route
router.delete("/:projectId", auth, projectController.remove ) // works properly if projectId is valid. If a project is deleted, it is not being removed from User.projects.

// get project users
router.get("/:projectId/users", auth, projectController.usersInProject) // If projectId is correct, we return all user objects attached to this project
// including their email and hashed password and we probz shouldnt be doing that

// get app users not in project
router.get("/:projectId/add_users", auth, projectController.usersNotInProject) // works correctly - we should probably yeet some test users :p

// Project add any user role to a project
router.post("/:projectId/users", auth, projectController.addUser ) // hangs if no body is sent in request, but works properly if correct body is sent
// same user with same role can be added to same project unlimited times

// Remove User from Project
router.delete("/:projectId/users/:userId", auth, projectController.removeUser ) // works correctly - dont send body, send if of
// user you want to delete in request url. If you try to delete a user that's not in the project the request hangs with
// `UnhandledPromiseRejectionWarning: TypeError: Cannot read property '_id' of undefined` error

router.put("/:projectId/users/:userId", auth, projectController.updateUser ) // haven't tested this

router.put("/:projectId/tasks", auth, taskController.createTask ) // we're not figuring out dates correctly

router.delete("/:projectId/tasks/:taskId", auth, taskController.removeTask ) //havent tested yet bc cant create tasks

router.put("/:projectId/tasks/:taskId", auth, taskController.updateTask ) // havent tested yet bc cant create tasks

module.exports = router