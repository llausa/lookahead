process.env.NODE_ENV = "test"

const app = require("../../index")
const mongoose = require("mongoose")
const { UserModel } = require("../../models/user")
const chai = require("chai")
const chaiHttp = require("chai-http")
const chaiAsPromised = require("chai-as-promised")
const JWT = require("jsonwebtoken")
const { ProjectModel } = require("../../models/project")
const expect = chai.expect
chai.use(chaiAsPromised)
chai.use(chaiHttp)

let validOwner = {
	firstName: "notATest",
	lastName: "notATester",
	position: "notABiggBoi",
	email: "notatest@test.com",
	password: "Test1245"
}

let validUser = {
	firstName: "Test",
	lastName: "Tester",
	position: "biggboi",
	email: "test@test.com",
	password: "Test1245"
}

let validUser2 = {
	firstName: "Test2",
	lastName: "Tester2",
	position: "biggboi2",
	email: "test2@test.com",
	password: "Test54321"
}

let validProject = {
	title: "Test Project",
	create_date: "2020-02-01",
	start_date: "2020-02-02",
	end_date: "2020-02-05",
	location: "Brisbane",
	timezone: 10
}

let authToken
let secondToken
let projectId
let decoded

if (mongoose.connection.name === "lookahead-test") {
	// console.log('WE ARE RUNNING THESE TESTS!')

	describe("Page load Integration Tests", () => {
		before(done => {
			mongoose
				.connect("mongodb://localhost/lookahead-test", {
					useNewUrlParser: true,
					useCreateIndex: true,
					useUnifiedTopology: true
				})
				.then(
					mongoose.connection
						.once("open", () => {
							// console.log('Connected to the Test Database')
							done()
						})
						.on("error", error => {
							console.warn("Error : ", error)
						})
				)
		})

		beforeEach(done => {
			mongoose.connection.db.dropDatabase(() => {
				done()
			})
		})

		beforeEach(done => {
			chai
				.request(app)
				.post("/api/users")
				.type("form")
				.send(validUser)
				.end((err, res) => {
					chai
						.request(app)
						.post("/api/auth")
						.type("form")
						.send({
							email: "test@test.com",
							password: "Test1245"
						})
						.end((err, res) => {
							authToken = res.body.token
              decoded = JWT.decode(authToken)
							chai
								.request(app)
								.post("/api/projects")
								.type("form")
								.set("Authorization", `Bearer ${authToken}`)
								.send(validProject)
								.end(async (err, res) => {
									await ProjectModel.find({ title: "Test Project" }, function(
										err,
										project
									) {
										projectId = project[0]._id
										done()
									})
								})
						})
				})
		})

		after(done => {
			console.log("Closing Connection")
			mongoose.connection.close(() => {
				done()
			})
		})

		describe("Successful Page Loads", () => {


			it("Succesfully Loads the Projects Page Data", done => {
				chai
					.request(app)
					.get("/api/projects")
					.set("Authorization", `Bearer ${authToken}`)
					.end((err, res) => {
						expect(err).to.be.null
						expect(res).to.have.status(200)
						expect(res.body).to.be.an("array")
						done()
					})
			})

			it("Succesfully Loads the User Details Page Data", done => {
				chai
					.request(app)
					.get("/api/users/details")
					.set("Authorization", `Bearer ${authToken}`)
					.end((err, res) => {
						expect(err).to.be.null
						expect(res).to.have.status(200)
						expect(res.body.user).to.have.property("firstName", validUser.firstName)
						expect(res.body.user).to.have.property("lastName", validUser.lastName)
						expect(res.body.user).to.have.property("position", validUser.position)
						done()
					})
			})

			it("Succesfully Loads the Project Users Page Data", done => {
				chai
					.request(app)
					.get(`/api/projects/${projectId}/users`)
					.set("Authorization", `Bearer ${authToken}`)
					.end((err, res) => {
						expect(err).to.be.null
						expect(res).to.have.status(200)
						expect(res.body).to.be.an("array")
						done()
					})
			})

      it("Succesfully Loads the Project Users Page Data", done => {
				chai
					.request(app)
					.get(`/api/projects/${projectId}/add_users`)
					.set("Authorization", `Bearer ${authToken}`)
					.end((err, res) => {
						expect(err).to.be.null
						expect(res).to.have.status(200)
						expect(res.body).to.be.an("array")
						done()
					})
			})

			it("Succesfully Loads the Project Page Data", done => {
				chai
					.request(app)
					.get(`/api/projects/${projectId}`)
					.set("Authorization", `Bearer ${authToken}`)
					.end((err, res) => {
						expect(err).to.be.null
						expect(res).to.have.status(200)
						expect(res.body).to.have.property("title", validProject.title)
						done()
					})
			})
		})
	})
}
