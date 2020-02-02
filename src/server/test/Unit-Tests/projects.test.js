process.env.NODE_ENV = 'test'

const mongoose = require("mongoose")
const { UserModel } = require("../../models/user")
const { ProjectModel } = require("../../models/project")
const moment = require('moment')

const chai = require('chai')
const chaiAsPromised = require("chai-as-promised")
const expect = chai.expect
chai.use(chaiAsPromised)

function setDate (startDate, days) {
  let newDate = moment.utc(startDate).add(days, 'd').valueOf()
  return newDate
}

const validTestUser = {
  firstName: "Bob",
  lastName: "Test",
  email: "bob@test.com",
  password: "Test12345",
  position: "CEO"
}


const validTestUser2 = {
  firstName: "Jim",
  lastName: "Test",
  email: "Jim@test.com",
  password: "Test12345",
  position: "CTO"
}

const validTestUser3 = {
  firstName: "Jeff",
  lastName: "Test",
  email: "jeff@test.com",
  password: "Test12345",
  position: "COO"
}

const newTask = {
  title: "Biggest Yeet",
  start_time: 3,
  length: 15,
  day: 3
}

const overlapTask = {
  title: "Sad boi",
  start_time: 4,
  length: 2,
  day: 3
}

const overflowTask = {
  title: "Split Boi",
  start_time: 18,
  length: 15,
  day: 4
}

async function saveUsers() {
  ownerUser = new UserModel(validTestUser)
  await ownerUser.save()

  user1 = new UserModel(validTestUser2)
  await user1.save()

  user2 = new UserModel(validTestUser3)
  await user2.save()
}

describe('Test Project Model', () => {

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
      mongoose.connection.db.dropDatabase( async () => {
        done()
      })
  })

  beforeEach( async () => {
    await saveUsers()
    .then(() => {
      validProject = {
        title: "Construction Project",
        create_date: Date.now(),
        start_date: setDate(Date.now(), 3),
        end_date: setDate(Date.now(), 10),
        //Store Timezone as number +/- GMT?
        timezone: 10,
        owner: ownerUser._id,
        location: "Brisbane",
        tasks: [
          {
            title: "Big Yeet",
            start_time: 1,
            length: 5,
            day: 1
          },
          {
            title: "Bigger Yeet",
            start_time: 5,
            length: 10,
            day: 2
          }
        ],
        users: [
          {
            role: "ReadWrite",
            user: user1._id
          },
          {
            role: "Read",
            user: user2._id
          }
        ]
      }
    })

    .catch(err => {
      console.log(`Error is here: ${err}`)
    })
  })

  after( (done) => {
    console.log('Closing Connection')
   mongoose.connection.close(() => {
      done()
    })
  })

  describe('Successful Operations', () => {

    describe('Projects', () => {

      it('Creates and Saves a valid Project Successfully', async () => {
        const newProject = new ProjectModel(validProject)
        const savedProject = await newProject.save()
        return expect(savedProject._id).to.exist
      })

    })

    describe('Tasks', () => {

      it('Create and saves a task successfully', async () => {
        const newProject = new ProjectModel(validProject)
        const savedProject = await newProject.save()
        savedProject.tasks.push(newTask)
        await (savedProject.save())
        return expect(savedProject.tasks[2]._id).to.exist
      })

      it('Delete a task using ID successfully', async () => {
        const newProject = new ProjectModel(validProject)
        const savedProject = await newProject.save()
        let taskId = await savedProject.tasks[1]._id
        await savedProject.tasks.pull(taskId)
        return expect(savedProject.tasks[1]).to.not.exist
      })

    })

  })

  describe('Unsuccessful Operations', () => {

    describe('Missing Information', () => {

      it('Create project without Title should fail', async () => {
        validProject.title = undefined
        const invalidProject = new ProjectModel(validProject)
        return expect(invalidProject.save()).to.eventually.be.rejectedWith(Error).and.have.property('name', 'ValidationError')

      })

      it('Create project without start date should fail', async () => {
        validProject.title = "Construction Project"
        validProject.start_date = undefined
        const invalidProject = new ProjectModel(validProject)
        return expect(invalidProject.save()).to.eventually.be.rejectedWith(Error).and.have.property('name', 'ValidationError')
      })

      it('Create project without end date should fail', async () => {
        validProject.start_date = setDate(Date.now(), 3)
        validProject.end_date = undefined
        const invalidProject = new ProjectModel(validProject)
        return expect(invalidProject.save()).to.eventually.be.rejectedWith(Error).and.have.property('name', 'ValidationError')
      })

      it('Create project without timezone should fail', async () => {
        validProject.end_date = setDate(Date.now(), 10)
        validProject.timezone = undefined
        const invalidProject = new ProjectModel(validProject)
        return expect(invalidProject.save()).to.eventually.be.rejectedWith(Error).and.have.property('name', 'ValidationError')
      })

      it('Create project without owner should fail', async () => {
        validProject.timezone = 10
        validProject.owner = undefined
        const invalidProject = new ProjectModel(validProject)
        return expect(invalidProject.save()).to.eventually.be.rejectedWith(Error).and.have.property('name', 'ValidationError')
      })


    })

    describe('Timezone Validation', () => {

      it('Create Project with Timezone over max should fail', async () => {
        validProject.timezone = 15
        const invalidProject = new ProjectModel(validProject)
        return expect(invalidProject.save()).to.eventually.be.rejectedWith(Error).and.have.property('name', 'ValidationError')
      })

      it('Create Project with Timezone under min should fail', async () => {
        validProject.timezone = -13
        const invalidProject = new ProjectModel(validProject)
        return expect(invalidProject.save()).to.eventually.be.rejectedWith(Error).and.have.property('name', 'ValidationError')
      })

    })

    describe('Date Validation', () => {

      it('Start Date must be before End Date', async () => {
        validProject.start_date = setDate(Date.now(), 3)
        validProject.end_date = setDate(Date.now(), 2)
        const invalidProject = new ProjectModel(validProject)
        return expect(invalidProject.save()).to.eventually.be.rejectedWith(Error).and.have.property('name', 'ValidationError')
      })

      it('End Date must be after Start Date', async () => {
        validProject.start_date = setDate(Date.now(), 3)
        validProject.end_date = setDate(Date.now(), 2)
        const invalidProject = new ProjectModel(validProject)
        return expect(invalidProject.save()).to.eventually.be.rejectedWith(Error).and.have.property('name', 'ValidationError')
      })

    })

    describe('Task Validation', () => {

      it('Task must not overflow day', async () => {
        const newProject = new ProjectModel(validProject)
        const savedProject = await newProject.save()
        savedProject.tasks.push(overflowTask)
        return expect(savedProject.save()).to.eventually.be.rejectedWith(Error).and.have.property('name', 'ValidationError')
      })

      it('Tasks must not overlap', async () => {
        const newProject = new ProjectModel(validProject)
        const savedProject = await newProject.save()
        savedProject.tasks.push(overlapTask)
        return expect(savedProject.save()).to.eventually.be.rejectedWith(Error).and.have.property('name', 'ValidationError')
      })

    })

  })




})