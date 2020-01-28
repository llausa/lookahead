const mongoose = require("mongoose")
const { UserModel } = require("../models/user")
const ProjectModel = require("../models/project")
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
        console.log('Connected to the Test Database')
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
        timezone: 8,
        owner: ownerUser._id,
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
   mongoose.connection.close(() => {
      done()
    })
  })

  describe('Successful Operations', () => {

    it('Creates and Saves a valid Project Successfully', async () => {
      const newProject = new ProjectModel(validProject)
      const savedProject = await newProject.save()
      return expect(savedProject._id).to.exist
    })

  })




})