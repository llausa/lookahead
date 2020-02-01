process.env.NODE_ENV = 'test'

const app = require('../../index')
const mongoose = require("mongoose")
const { UserModel } = require("../../models/user")
const { ProjectModel } = require("../../models/project")
const chai = require('chai')
const chaiHttp = require('chai-http')
const chaiAsPromised = require("chai-as-promised")
const JWT = require('jsonwebtoken')
const expect = chai.expect
chai.use(chaiAsPromised)
chai.use(chaiHttp)

let validUser = {
	"firstName": "Test",
	"lastName": "Tester",
	"position": "biggboi",
	"email": "test@test.com",
	"password": "Test1245"
}

let validUser2 = {
	"firstName": "Two",
	"lastName": "Tester",
	"position": "smolboi",
	"email": "tester@gmail.com",
	"password": "Test1245"
}

let validProject = {
			"title": "Test Project",
      "create_date": "2020-02-01",
      "start_date": "2020-02-02",
      "end_date": "2020-02-05",
      "timezone": 10
}

let invalidProject = {
	"title": "Test Project",
	"create_date": "2020-02-01",
	"start_date": "2020-02-05",
	"end_date": "2020-02-03",
	"timezone": 10
}

let validTask = {
	"title": "Build House",
	"start_time": 2,
	"length": 4,
	"day": 1,
	"description": "Big Yeet"
}

let authToken
let userId
let secondToken
let projectId

if (mongoose.connection.name === 'lookahead-test') {

  describe('Project Integration Tests', () => {

		before( (done) => {
      mongoose.connect('mongodb://localhost/lookahead-test', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
      .then(
      mongoose.connection
        .once('open', () => {
          // console.log('Connected to the Test Database')
          done()
        })
        .on('error', (error) => {
            console.warn('Error : ',error)
      })
      )
    })

    beforeEach( (done) => {
      mongoose.connection.db.dropDatabase(() => {
        done()
      })
    })

    after( (done) => {
      console.log('Closing Connection')
      mongoose.connection.close(() => {
        done()
      })
		})

		beforeEach( (done) => {

			chai.request(app)
			.post('/api/users')
			.type('form')
			.send(validUser)
			.end((oof, yeet) => {
				
				chai.request(app)
				.post('/api/auth')
				.type('form')
				.send({
					"email": "test@test.com",
					"password": "Test1245"
				})
				.end((err, res) => {
					authToken = res.body.token
					done()
				})
			})
		})


		describe('Successful Operations', () => {

			it('Creates a Project Successfully', (done) => {
			
				chai.request(app)
					.post('/api/projects')
					.type('form')
					.set('Authorization', `Bearer ${authToken}`)
					.send(validProject)
					.end((err, res) => {
							expect(res.body.message).to.equal("Project successfully created.")
							expect(res).to.have.status(201)
							done()
					})
	
				})

			describe('Edit Project', () => {

				

				beforeEach( (done) => {
					chai.request(app)
          .post('/api/projects')
					.type('form')
					.set('Authorization', `Bearer ${authToken}`)
          .send(validProject)
          .end(async (err, res) => {

						await ProjectModel.find({ title: "Test Project"},
							function (err, project) {
								projectId = project[0]._id
								done()
							}
						)
						
					})
				})


				it('Update Project Details', (done) => {
					chai.request(app)
					.put(`/api/projects/${projectId}`)
					.type('form')
					.set('Authorization', `Bearer ${authToken}`)
					.send(
						{
							"end_date": "2020-02-10",
							"timezone": -4,
							"title": "Real Project"}
					)
					.end((err, res) => {

						ProjectModel.findById((projectId)),
							function (err, project) {
								expect(project.title).to.be("Real Project")
								expect(project.timezone).to.be(-4)
								expect(project.end_date).to.be("2020-02-10")
								expect(res).to.have.status(200)
								done()
							}
					})
				})
				


				it('Delete Project', (done) => {
					chai.request(app)
					.delete(`/api/projects/${projectId}`)
					.type('form')
					.set('Authorization', `Bearer ${authToken}`)
					.send()
					.end(async (err, res) => {

						await ProjectModel.findById((projectId)),
							function (err, project) {
								// expect(err).to.exist
								// expect(project).to.not.exist
								console.log(err)
								expect(res).to.have.status(200)
								done()
							}
						})
					})

					it('Invalid Project Details should reject', (done) => {
						chai.request(app)
							.post('/api/projects')
							.type('form')
							.set('Authorization', `Bearer ${authToken}`)
							.send(invalidProject)
							.end((err, res) => {
									expect(res.body.message).to.equal("Project details are not correct.")
									expect(res).to.have.status(400)
									done()
							})
					})
				
					it('Creates a Task Successfully', (done) => {
					
						console.log(projectId)
						chai.request(app)
						.put(`/api/projects/${projectId}/tasks`)
						.type('form')
						.set('Authorization', `Bearer ${authToken}`)
						.send(validTask)
						.end(async (err, res) => {

							await ProjectModel.find({ title: "Test Project"},
								function (err, project) {
									expect(project[0].tasks[0]._id).to.exist
									expect(res).to.have.status(201)
									done()
								}
							)

						})

					})
					
					describe('Task Edits', () => {

						let taskId

						beforeEach((done) => {
							chai.request(app)
							.put(`/api/projects/${projectId}/tasks`)
							.type('form')
							.set('Authorization', `Bearer ${authToken}`)
							.send(validTask)
							.end(async (err, res) => {

								await ProjectModel.find({ title: "Test Project"},
									function (err, project) {
										taskId = project[0].tasks[0]._id
										done()
									})
							})
						})

				
						it('Delete a Task Successfully', (done) => {
						
							chai.request(app)
							.delete(`/api/projects/${projectId}/tasks`)
							.set('Authorization', `Bearer ${authToken}`)
							.send(taskId)
							.end( async (err, res) => {

								await ProjectModel.find({ title: "Test Project"},
									function (err, project) {
										expect(project[0].tasks[0]).to.not.exist
										expect(res).to.have.status(200)
										done()
									}
								)

							})

						})

						it('Update a Task Successfully', (done) => {

							chai.request(app)
							.put(`/api/projects/${projectId}/tasks/${taskId}`)
							.set('Authorization', `Bearer ${authToken}`)
							.send({
								"title": "Build Apartment",
								"start_time": 3,
								"length": 3,
								"day": 3,
								"description": "Bigger Yeetimus"
							})
							.end( async (err, res) => {

								await ProjectModel.find({ title: "Test Project"},
									function (err, project) {
										expect(project[0].tasks[0]).to.have.property('title', 'Build Apartment')
										expect(project[0].tasks[0]).to.have.property('start_time', 3)
										expect(project[0].tasks[0]).to.have.property('length', 3)
										expect(project[0].tasks[0]).to.have.property('day', 3)
										expect(project[0].tasks[0]).to.have.property('description', 'Bigger Yeetimus')
										expect(res).to.have.status(200)
										done()
									}
								)

							})

						})
						
					})

				describe('User changes', () => {

					beforeEach( (done) => {

						chai.request(app)
						.post('/api/users')
						.type('form')
						.send(validUser2)
						.end((oof, yeet) => {
							
							chai.request(app)
							.post('/api/auth')
							.type('form')
							.send({
								"email": "tester@gmail.com",
								"password": "Test1245"
							})
							.end((err, res) => {
								secondToken = res.body.token
								userId = JWT.decode(res.body.token)._id
								done()
							})
						})
					})

					it('Add User to Project', (done) => {
						chai.request(app)
						.post(`/api/projects/${projectId}/users`)
						.set('Authorization', `Bearer ${authToken}`)
						.send({
							"role": "read", 
							"user": userId 
						})
						.end( async (errors, res) => {

							await ProjectModel.find({ title: "Test Project"},
								function (error, project) {
									expect(project[0].users[0]).to.exist.and.to.have.nested.property('role', 'read')
									expect(res).to.have.status(200)
								}
							)

							await UserModel.findById((userId),
							function (err, user) {
								expect(user[0].projects[0]).to.exist.and.to.have.nested.property('role', 'read')
								done()
							})

							
						})
					})

					describe('User Edits', () => {

						beforeEach(() => {
							chai.request(app)
							.post(`/api/projects/${projectId}/users`)
							.set('Authorization', `Bearer ${authToken}`)
							.send(
								{
									"role": "read", 
									"user": userId 
								}
							)
							.end((errors, res) => {
								done()
							})
						})

						it('Remove User from Project', (done) => {
							
							chai.request(app)
							.delete(`/api/projects/${projectId}/users/${userId}`)
							.set('Authorization', `Bearer ${authToken}`)
							.send()
							.end( async (errors, res) => {

								await ProjectModel.find({ title: "Test Project"},
										async function (err, project) {
											expect(project[0].users[0]).to.not.exist

											await UserModel.findById((userId),
												function (err, user) {
													expect(user[0].projects[0]).to.not.exist
													expect(res).to.have.status(200)
													done()
											})

										}
									)

								

							})

						})

						it('Edit Existing User Role', (done) => {
							
							chai.request(app)
							.put(`/api/projects/${projectId}/users`)
							.set('Authorization', `Bearer ${authToken}`)
							.send(
								{
								"role": "read", 
								"user": userId 
								}
							)
							.end( async (errors, res) => {

								await ProjectModel.find({ title: "Test Project"},
										function (err, project) {
											expect(project[0].users[0]).to.not.exist
										}
									)

								await UserModel.findById((userId),
									function (err, user) {
										expect(user[0].projects[0].role).to.exist
										expect(res).to.have.status(200)
										done()
								})

							})
						})

					})

				})

			})

		})


		describe('Unsuccessful Operations', () => {

			describe('Incorrect Data', () => {

				beforeEach((done) => {
					chai.request(app)
					.post('/api/users')
					.type('form')
					.send(validUser2)
					.end((oof, yeet) => {
						
						chai.request(app)
						.post('/api/auth')
						.type('form')
						.send({
							"email": "tester@gmail.com",
							"password": "Test1245"
						})

						.end((err, res) => {
							secondToken = res.body.token
							userId = JWT.decode(res.body.token)._id
							
							chai.request(app)
							.post('/api/projects')
							.type('form')
							.set('Authorization', `Bearer ${authToken}`)
							.send(validProject)
							.end(async (err, res) => {

								await ProjectModel.find({ title: "Test Project"},
									function (error, project) {
										projectId = project[0]._id

										chai.request(app)
										.put(`/api/projects/${projectId}/users`)
										.set('Authorization', `Bearer ${authToken}`)
										.send({
											"role": "read", 
											"user": userId 
										})
										.end(() => {
											done()
										})
									}
								)
							})
						})
					})
				})


				it('Unauthorised User Edit should reject', (done) => {

					chai.request(app)
						.put(`/api/projects/${projectId}`)
						.type('form')
						.set('Authorization', `Bearer ${secondToken}`)
						.send(
							{
								"end_date": "2020-02-10",
								"timezone": -4,
								"title": "Real Project"}
						)
						.end(async (err, res) => {
								expect(res.body.message).to.equal('You do not have permission to do that.')
								expect(res).to.have.status(401)
								done()
						})
				})

				describe('Project Updates', () => {

					it('Invalid Timezone should reject', (done) => {
						expect(true).to.equal(false)
						done()
					})

					it('Earlier End Date should reject', (done) => {
						expect(true).to.equal(false)
						done()
					})


				})

			})


		})
    
  })

}