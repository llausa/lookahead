const mongoose = require("mongoose")
const UserModel = require("../models/user")

const chai = require('chai')
const chaiAsPromised = require("chai-as-promised")
const expect = chai.expect
chai.use(chaiAsPromised)


// const validProject


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

  // describe('Successful Operations', () => {

  //   it('Creates and Saves a valid Project Successfully')

  // })




})