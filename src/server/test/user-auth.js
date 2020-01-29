
process.env.NODE_ENV = 'test'

const app = require('../index')
const mongoose = require("mongoose")
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

let invalidUser = {
  "firstName": "Test",
	"position": "biggboi",
	"email": "test@tester.com",
	"password": "Test1245"
}

if (mongoose.connection.name == 'lookahead-test') {

  describe('Integration Tests', () => { 

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

    describe('Registration', () => {

      describe('Successful Registration', () => {

        it('Succesfully Registers an Account', (done) => {
          chai.request(app)
          .post('/api/users')
          // .type('form')
          .send(validUser)
          .end((err, res) => {
              // console.log(res)
              expect(err).to.be.null
              expect(res).to.have.status(201)
              expect(res.body.message).to.equal('User ben@testerino.com successfully created.')
              done()
          })
        })

      })

      describe('Unsuccesful Registration', () => {
        
        beforeEach( (done) => { 
          chai.request(app)
          .post('/api/users')
          .type('form')
          .send(validUser)
          .end((err, res) => {
              done()
          })
        })

        it('Duplicate Email Registration should fail', (done) => {
          chai.request(app)
          .post('/api/users')
          .type('form')
          .send(validUser)
          .end((err, res) => {
            expect(res).to.have.status(409)
              expect(res.body.message).to.equal('An account already exists with that email.')
              done()
          })
        })

        it('Missing Last Name should fail',  (done) => {
          chai.request(app)
          .post('/api/users')
          .type('form')
          .send(invalidUser)
          .end((err, res) => {
            expect(res).to.have.status(400)
            expect(res.body.message).to.equal('Last Name is required.')
            done()
          })
        })

        it('Missing First Name should fail',  (done) => {
          invalidUser.lastName = "Tester"
          invalidUser.firstName = undefined
          chai.request(app)
          .post('/api/users')
          .type('form')
          .send(invalidUser)
          .end((err, res) => {
            expect(res).to.have.status(400)
            expect(res.body.message).to.equal('First Name is required.')
            done()
          })
        })

        it('Missing Email should fail',  (done) => {
          invalidUser.email = undefined
          invalidUser.firstName = "Test"
          chai.request(app)
          .post('/api/users')
          .type('form')
          .send(invalidUser)
          .end((err, res) => {
            expect(res).to.have.status(400)
            expect(res.body.message).to.equal('Email address is required.')
            done()
          })
        })

        it('Missing Password should fail',  (done) => {
          invalidUser.email = "test@tester.com"
          invalidUser.firstName = "Test"
          chai.request(app)
          .post('/api/users')
          .type('form')
          .send(invalidUser)
          .end((err, res) => {
            expect(res).to.have.status(400)
            expect(res.body.message).to.equal('Password is required.')
            done()
          })
        })

        it('Invalid Email format should fail',  (done) => {
          invalidUser.email = 'test@testcom'
          chai.request(app)
          .post('/api/users')
          .type('form')
          .send(invalidUser)
          .end((err, res) => {
            expect(res).to.have.status(400)
            expect(res.body.message).to.equal('Email address must be a valid email.')
            done()
          })
        })

      })

    })


    describe('Login', () => {
      
      beforeEach( (done) => { 
        chai.request(app)
        .post('/api/users')
        .type('form')
        .send(validUser)
        .end((err, res) => {
            done()
        })
      })

      describe('Successful Login', () => {

        it('Successfully Logs in an existing User and returns Token', (done) => {
          chai.request(app)
          .post('/api/auth')
          .type('form')
          .send({ 
            "email": "test@test.com",
            "password": "Test1245"
          })
          .end((err, res) => {
              expect(res).to.have.status(200)
              expect(res.body.token).to.exist
              done()
          })
        })

        it('Successfully Logs in and Token contains User ID', (done) => {
          chai.request(app)
          .post('/api/auth')
          .type('form')
          .send({ 
            "email": "test@test.com",
            "password": "Test1245"
          })
          .end((err, res) => {
            expect(res.body.token).to.exist
            expect(res).to.have.status(200)
            var decoded = JWT.decode(res.body.token)
            expect(decoded._id).to.exist
            done()
          })
        })

      })

      describe('Unsuccessful Login', () => {

        it('Invalid Email should fail login with generic error message.', (done) => {
          chai.request(app)
          .post('/api/auth')
          .type('form')
          .send({
            email: "test@tester.com",
            password: "Test1245"
            })
          .end((err, res) => {
            expect(res).to.have.status(401)
            expect(res.body.message).to.equal('Invalid Username or Password.')
            done()
          })
        })

          it('Invalid password should fail login with generic error message', (done) => {
            chai.request(app)
            .post('/api/auth')
            .type('form')
            .send({
              email: "test@test.com",
              password: "Test1254"
              })
            .end((err, res) => {
              expect(res).to.have.status(401)
              expect(res.body.message).to.equal('Invalid Username or Password.')
              done()
            })

        })


      })
      
    })
    
  })
}