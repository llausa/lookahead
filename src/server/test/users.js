const mongoose = require("mongoose")
const UserModel = require("../models/user")

const chai = require('chai')
const chaiAsPromised = require("chai-as-promised")
const expect = chai.expect
chai.use(chaiAsPromised)


const validTestUser = {
  firstName: "Bob",
  lastName: "Test",
  email: "bob@test.com",
  password: "test123",
  position: "CEO"
}

const invalidTestUser = {
  firstName: "Jim",
  lastName: "Test",
  password: "test123",
  position: "Hmm"
}

const blankTestUser = {}

describe('Test User Model', () => {

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
      mongoose.connection.db.dropDatabase(() => {
        done()
      })
  })

  after( (done) => {
   mongoose.connection.close(() => {
      done()
    })
  })

  describe('Successful Operations', () => {

    it('Creates and Saves a valid User successfully - ID Check', async () => {
      const validUser = new UserModel(validTestUser)
      const savedUser = await validUser.save()
      return expect(savedUser._id).to.exist
    })

    it('Creates and Saves a valid User successfully - Email Check', async () => {
      const validUser = new UserModel(validTestUser)
      const savedUser = await validUser.save()
      return expect(savedUser.email).to.equal(validTestUser.email)
    })


    it('Creates User without position should default', async () => {
      validTestUser.position = undefined
      const validUser = new UserModel(validTestUser)
      const savedUser = await validUser.save()
      return expect(savedUser.position).to.equal('worker')
    })
  })

  describe('Unsuccessful Operations', () => {

    it('Create User without email should fail', async () => {
      const invalidUser = new UserModel(invalidTestUser)
      return expect(invalidUser.save()).to.eventually.be.rejectedWith(Error).and.have.property('name', 'ValidationError')
    })

    it('Create blank user should fail', async () => {
      const invalidUser = new UserModel(blankTestUser)
      return expect(invalidUser.save()).to.eventually.be.rejectedWith(Error).and.have.property('name', 'ValidationError')
    })

    it('Create user with duplicate email should fail', async () => {
      invalidTestUser.email = "bob@test.com"
      console.log(invalidTestUser)
      console.log(validTestUser)
      const validUser = new UserModel(validTestUser)
      const invalidUser = new UserModel(invalidTestUser)
      await validUser.save()
      return expect(invalidUser.save()).to.eventually.be.rejectedWith(Error).and.have.property('name', 'ValidationError')
    })
    
  })
})