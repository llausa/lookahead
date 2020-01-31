
process.env.NODE_ENV = 'test'

const app = require('../../index')
const mongoose = require("mongoose")
const { UserModel } = require("../../models/user")
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
  "firstName": "Jim",
	"lastName": "Tester",
	"position": "CEO",
	"email": "tester@tester.com",
	"password": "Test1245"
}

let invalidUser = {
  "firstName": "Test",
	"position": "biggboi",
	"email": "test@tester.com",
	"password": "Test1245"
}



if (mongoose.connection.name === 'lookahead-test') {

  // console.log('WE ARE RUNNING THESE TESTS!')

  describe('User Integration Tests', () => {

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

    describe('Registration', () => {

      describe('Successful Registration', () => {

        it('Succesfully Registers an Account', (done) => {
          chai.request(app)
          .post('/api/users')
          .type('form')
          .send(validUser)
          .end((err, res) => {
              expect(err).to.be.null
              expect(res).to.have.status(201)
              expect(res.body.message).to.equal('User test@test.com successfully created.')
              done()
          })
        })

      })

      describe('Unsuccesful Registration', () => {

        it('Duplicate Email Registration should fail', (done) => {

          chai.request(app)
          .post('/api/users')
          .type('form')
          .send(validUser)
          .end((oof, yeet) => {

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


        })

        it('Missing Last Name should fail', (done) => {
          chai.request(app)
          .post('/api/users')
          .type('form')
          .send(invalidUser)
          .end((err, res) => {
            expect(res).to.have.status(400)
            expect(res.body.message).to.equal("Invalid user data.")
            done()
          })
        })

        it('Missing First Name should fail', (done) => {
          invalidUser.lastName = "Tester"
          invalidUser.firstName = undefined
          chai.request(app)
          .post('/api/users')
          .type('form')
          .send(invalidUser)
          .end((err, res) => {
            expect(res).to.have.status(400)
            expect(res.body.message).to.equal("Invalid user data.")
            done()
          })
        })

        it('Missing Email should fail', (done) => {
          invalidUser.email = undefined
          invalidUser.firstName = "Test"
          chai.request(app)
          .post('/api/users')
          .type('form')
          .send(invalidUser)
          .end((err, res) => {
            expect(res).to.have.status(400)
            expect(res.body.message).to.equal("Invalid user data.")
            done()
          })
        })

        it('Missing Password should fail', (done) => {
          invalidUser.email = "test@tester.com"
          invalidUser.firstName = "Test"
          invalidUser.password = undefined
          chai.request(app)
          .post('/api/users')
          .type('form')
          .send(invalidUser)
          .end((err, res) => {
            expect(res).to.have.status(400)
            expect(res.body.message).to.equal("Invalid user data.")
            done()
          })
        })

        it('Invalid Email format should fail', (done) => {
          invalidUser.email = 'test@testcom'
          chai.request(app)
          .post('/api/users')
          .type('form')
          .send(invalidUser)
          .end((err, res) => {
            expect(res).to.have.status(400)
            expect(res.body.message).to.equal("Invalid user data.")
            done()
          })
        })

        it('Invalid password should fail - Capital', (done) => {
          invalidUser.email = 'test@tester.com'
          invalidUser.password = 'test1245'
          chai.request(app)
          .post('/api/users')
          .type('form')
          .send(invalidUser)
          .end((err, res) => {
            expect(res).to.have.status(400)
            expect(res.body.message).to.equal("Invalid user data.")
            done()
          })
        })

        it('Invalid password should fail - Number', (done) => {
          invalidUser.password = 'Testerino'
          chai.request(app)
          .post('/api/users')
          .type('form')
          .send(invalidUser)
          .end((err, res) => {
            expect(res).to.have.status(400)
            expect(res.body.message).to.equal("Invalid user data.")
            done()
          })
        })

        it('Invalid password should fail - Length', (done) => {
          invalidUser.password = 'Test12'
          chai.request(app)
          .post('/api/users')
          .type('form')
          .send(invalidUser)
          .end((err, res) => {
            expect(res).to.have.status(400)
            expect(res.body.message).to.equal("Invalid user data.")
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
            expect(res.body.message).to.equal('Invalid Email or Password.')
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
            expect(res.body.message).to.equal('Invalid Email or Password.')
            done()
          })

        })


      })

    })

    describe('Edit Details', () => {

      let authToken

        beforeEach( (done) => {
          chai.request(app)
          .post('/api/users')
          .type('form')
          .send(validUser)
          .end((err, res) => {
            done()
          })
        })


      describe('Successful Operations', () => {

        beforeEach( (done) => {
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

        it('Successfully updated password', (done) => {
          chai.request(app)
          .put('/api/users/password')
          .type('form')
          .set('Authorization', `Bearer ${authToken}`)
          .send(
            {
              "currentPassword" : validUser.password,
              "newPassword": "Shiny12345"
            }
          )
          .end((err, res) => {
              expect(res).to.have.status(200)
              expect(res.body.message).to.equal('Password updated succesfully.')
              done()
          })

        })

        it('Successfully Update Email', (done) => {

          chai.request(app)
          .put('/api/users/email')
          .type('form')
          .set('Authorization', `Bearer ${authToken}`)
          .send(
            {
              "email": "new@email.com",
              "password": validUser.password
            }
          )
          .end((err, res) => {
            expect(res).to.have.status(200)
            expect(res.body.message).to.equal('Email updated successfully.')

            UserModel.findOne({ email: 'new@email.com' },
            (err, user) => {
              expect(err).to.be.null
              expect(user.firstName).to.equal(validUser.firstName)
              expect(user.lastName).to.equal(validUser.lastName)
              expect(user.position).to.equal(validUser.position)
              expect(user.email).to.equal('new@email.com')
              done()
            })

          })

        })

        it('Successfully Update Account Details', (done) => {

          chai.request(app)
          .put('/api/users/details')
          .type('form')
          .set('Authorization', `Bearer ${authToken}`)
          .send(
            {
              "firstName": "Alex",
              "lastName": "Yeetimus",
              "position": "Main Man"
            }
          )
          .end((err, res) => {

            expect(res).to.have.status(200)
            expect(res.body.message).to.equal('Account Details Successfully Updated')

            UserModel.findOne({ email: 'test@test.com' },
            (err, user) => {
              expect(err).to.be.null
              expect(user.firstName).to.equal("Alex")
              expect(user.lastName).to.equal("Yeetimus")
              expect(user.position).to.equal("Main Man")
              done()
            })

          })

        })

      })


      describe('Unsuccessful Operations', () => {

          beforeEach( (done) => {
            chai.request(app)
            .post('/api/users')
            .type('form')
            .send(validUser2)
            .end((err, res) => {


            chai.request(app)
            .post('/api/auth')
            .type('form')
            .send({
              "email": validUser2.email,
              "password": validUser2.password
            })
            .end((err, res) => {
              authToken = res.body.token
              done()
            })
            })

          })

        it('Update without Token should fail', (done) => {
          chai.request(app)
          .put('/api/users/password')
          .type('form')
          .send(
            {
              "currentPassword" : validUser.password,
              "newPassword": "Shiny12345"
            }
          )
          .end((err, res) => {
              expect(res).to.have.status(401)
              expect(res.body.message).to.equal('Access denied. No token provided.')
              done()
          })

        })

        it('Duplicate Email should fail', (done) => {

          chai.request(app)
          .put('/api/users/email')
          .type('form')
          .set('Authorization', `Bearer ${authToken}`)
          .send(
            {
              "email": "test@test.com",
              "password": validUser2.password
            }
          )
          .end((err, res) => {

            expect(res).to.have.status(409)
            expect(res.body.message).to.equal('An account already exists with that email.')
            done()
          })

        })

        describe('Invalid Data', () => {

          it('Invalid Email should fail', (done) => {

            chai.request(app)
            .put('/api/users/email')
            .type('form')
            .set('Authorization', `Bearer ${authToken}`)
            .send(
              {
                "email": "test@testcom",
                "password": validUser2.password
              }
            )
            .end((err, res) => {
              expect(res).to.have.status(400)
              expect(res.body.message).to.equal('Email address must be a valid email.')
              done()
            })

          })

          it('Incorrect password should fail', (done) => {

            chai.request(app)
            .put('/api/users/email')
            .type('form')
            .set('Authorization', `Bearer ${authToken}`)
            .send(
              {
                "email": "test@tester.com",
                "password": "wrongpassword"
              }
            )
            .end((err, res) => {
              expect(res).to.have.status(400)
              expect(res.body.message).to.equal('Incorrect Password')
              done()
            })

          })

          it('Invalid password should fail (No Number)', (done) => {

            chai.request(app)
            .put('/api/users/password')
            .type('form')
            .set('Authorization', `Bearer ${authToken}`)
            .send(
              {
                "currentPassword" : validUser.password,
                "newPassword": "Shiniest"
              }
            )
            .end((err, res) => {
              expect(res).to.have.status(400)
              expect(res.body.message).to.equal('Invalid password.')
              done()
            })

          })

          it('Invalid password should fail (No Capital)', (done) => {

            chai.request(app)
            .put('/api/users/password')
            .type('form')
            .set('Authorization', `Bearer ${authToken}`)
            .send(
              {
                "currentPassword" : validUser.password,
                "newPassword": "shiny12345"
              }
            )
            .end((err, res) => {
              expect(res).to.have.status(400)
              expect(res.body.message).to.equal('Invalid password.')
              done()
            })

          })

          it('Invalid password should fail (Length)', (done) => {

            chai.request(app)
            .put('/api/users/password')
            .type('form')
            .set('Authorization', `Bearer ${authToken}`)
            .send(
              {
                "currentPassword" : validUser.password,
                "newPassword": "Shiny12"
              }
            )
            .end((err, res) => {
              expect(res).to.have.status(400)
              expect(res.body.message).to.equal('Invalid password.')
              done()
            })

          })


        })

      })

    })

  })


}