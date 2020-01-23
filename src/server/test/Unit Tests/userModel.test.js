const mongoose = require('mongoose')
const UserModel = require('../../models/user')


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

const blankPositionUser = {
  firstName: "Jeff",
  lastName: "Tester",
  email: "bob@test.com",
  password: "test123"
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

  describe('Successful Operations', () => {

    it('create & save valid user successfully', async () => {
      expect.assertions(5)
      const validUser = new UserModel(validTestUser)
      
      await validUser.save()
      .then(savedUser => {
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

    it('create user without position should be default', async () => {
      expect.assertions(5)
      const validUser = new UserModel(blankPositionUser)
      await validUser.save()
      .then(savedUser => {
        expect(savedUser._id).toBeDefined()
        expect(savedUser.firstName).toBe(blankPositionUser.firstName)
        expect(savedUser.lastName).toBe(blankPositionUser.lastName)
        expect(savedUser.email).toBe(blankPositionUser.email)
        expect(savedUser.position).toBe("worker")
      })
      .catch(err => {
        expect(err).toBeUndefined()
      })
    })


  })


  describe('Unsuccessful Operations', () => {

    it('create user without email should fail', async () => {
      expect.assertions(3)
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
      expect.assertions(3)
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
      expect.assertions(6)
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

    it('create user with non-unique email should fail', async () => {
      expect.assertions(8)
      const validUser = new UserModel(validTestUser)
      
      await validUser.save()
      .then(savedUser => {
        console.log(savedUser)
        expect(savedUser._id).toBeDefined()
        expect(savedUser.firstName).toBe(validTestUser.firstName)
        expect(savedUser.lastName).toBe(validTestUser.lastName)
        expect(savedUser.email).toBe(validTestUser.email)
        expect(savedUser.position).toBe(validTestUser.position)
      })
      .catch(err => {
        expect(err).toBeUndefined()
      })

      const duplicateEmailUser = new UserModel(blankPositionUser)
      await duplicateEmailUser.save()
      .then(unsavedUser => {
        console.log(unsavedUser)
        expect(unsavedUser._id).toBeDefined()
      })
      .catch(err => {
        console.log(err.errors)
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
        expect(err.errors.email).toBeDefined()
        expect(err.errors.firstName).toBeUndefined()
      })
    })
  })

})