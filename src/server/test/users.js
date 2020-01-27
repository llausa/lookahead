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
  password: "Test12345",
  position: "CEO"
}

const invalidTestUser = {
  firstName: "Jim",
  lastName: "Test",
  password: "Test12345",
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

    describe('Missing Information', () => {

    it('Create User without email should fail', async () => {
      const invalidUser = new UserModel(invalidTestUser)
      return expect(invalidUser.save()).to.eventually.be.rejectedWith(Error).and.have.property('name', 'ValidationError')
    })

    it('Create blank user should fail', async () => {
      const invalidUser = new UserModel(blankTestUser)
      return expect(invalidUser.save()).to.eventually.be.rejectedWith(Error).and.have.property('name', 'ValidationError')
    })

    it('Create User without password should fail', async () => {
      
    })

  })

    describe('Email Validation', () => {

    it('Create user with duplicate email should fail', async () => {
      invalidTestUser.email = "bob@test.com"
      const validUser = new UserModel(validTestUser)
      const invalidUser = new UserModel(invalidTestUser)
      await validUser.save()
      return expect(invalidUser.save()).to.eventually.be.rejectedWith(Error).and.have.property('name', 'ValidationError')
    })

    it('Create user with short email should fail', async () => {
      invalidTestUser.email = "a@b.c"
      const invalidUser = new UserModel(invalidTestUser)
      return expect(invalidUser.save()).to.eventually.be.rejectedWith(Error).and.have.property('name', 'ValidationError')
    })

    it("Create user without '@' in email should fail", async () => {
      invalidTestUser.email = "abcdef.com"
      const invalidUser = new UserModel(invalidTestUser)
      return expect(invalidUser.save()).to.eventually.be.rejectedWith(Error).and.have.property('name', 'ValidationError')
    })

    it('Create user without "." in email should fail', async () => {
      invalidTestUser.email = "ab@cdefcom"
      const invalidUser = new UserModel(invalidTestUser)
      return expect(invalidUser.save()).to.eventually.be.rejectedWith(Error).and.have.property('name', 'ValidationError')
    })

  })

    describe('Password Validation', () => {
    

    it('Create user without capital in password should fail', async () => {
      invalidTestUser.email = "abc@def.com"
      invalidTestUser.password = "test12345"
      const invalidUser = new UserModel(invalidTestUser)
      return expect(invalidUser.save()).to.eventually.be.rejectedWith(Error).and.have.property('name', 'ValidationError')
    })

    it('Create user without capital in password should fail', async () => {
      invalidTestUser.password = "Testerino"
      const invalidUser = new UserModel(invalidTestUser)
      return expect(invalidUser.save()).to.eventually.be.rejectedWith(Error).and.have.property('name', 'ValidationError')
    })

    it('Create user without 8 digits in password should fail', async () => {
      invalidTestUser.password = "Test123"
      const invalidUser = new UserModel(invalidTestUser)
      return expect(invalidUser.save()).to.eventually.be.rejectedWith(Error).and.have.property('name', 'ValidationError')
    })

  })
    
  })
})