const mongoose = require('mongoose')
const UserModel = require('../models/user')


const validTestUser = {
    firstName: "Bob",
    lastName: "Test",
    email: "bob@test.com",
    password: "test123",
    position: "CEO"
}

const invalidEmailUser = {
  firstName: "Bob",
  lastName: "Test",
  password: "test123",
  position: "CEO"
}

const invalidPWUser = {
  firstName: "Bob",
  lastName: "Test",
  email: "bob@test.com",
  position: "CEO"
}

const blankTestUser = {
  firstName: "",
    lastName: "",
    email: "",
    password: "",
    position: ""
}


beforeEach(async () => {
  console.log("Opening Connection")
  await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err) => {
    if (err) {
      console.log(err)
      process.exit(1)
    }
  })
  
})

afterEach(async () => {
  console.log("Closing Connection")
  await mongoose.connection.close

})



describe('User Model Test', () => {

  it('create & save valid user successfully', async () => {
    const validUser = new UserModel(validTestUser)
    
    await validUser.save()
    .then(savedUser => {
      console.log('testing')
      expect(savedUser._id).toBeDefined()
      expect(savedUser.firstName).toBe(validTestUser.firstName)
      expect(savedUser.lastName).toBe(validTestUser.lastName)
      expect(savedUser.email).toBe(validTestUser.email)
      expect(savedUser.position).toBe(validTestUser.position)
    })
    .catch(err => {
      console.log("hmm")
      expect(err).toBeUndefined()
    })
  })



  // describe('Incomplete data should cause failure')

  it('create user without email should fail', async () => {
    const invalidUser = new UserModel(invalidEmailUser)
    await invalidUser.save()
    .then(unsavedUser => {
      expect(unsavedUser).toBeDefined()
    })
    .catch(err => {
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
      expect(err.errors.email).toBeDefined()
      expect(err.errors.password).toBeUndefined()
    })
  })


  it('create user without password should fail', async () => {
    const invalidUser = new UserModel(invalidPWUser)
    await invalidUser.save()
    .then(unsavedUser => {
      expect(unsavedUser).toBeDefined()
    })
    .catch(err => {
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
      expect(err.errors.email).toBeUndefined()
      expect(err.errors.password).toBeDefined()
    })
  })

  it('create blank user should fail', async () => {
    expect.assertions(2)
    const invalidUser = new UserModel(blankTestUser)
    await invalidUser.save()
    .then(unsavedUser => {
      expect(unsavedUser).toBeDefined()
    })
    .catch(err => {
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
      expect(err.errors.email).toBeDefined()
      expect(err.errors.password).toBeDefined()
      expect(err.errors.firstName).toBeDefined()
      expect(err.errors.lastName).toBeDefined()
      expect(err.errors.position).toBeUndefined()
    })
  })

  

})