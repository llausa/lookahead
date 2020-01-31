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

let authToken


if (mongoose.connection.name === 'lookahead-test') {

  // console.log('WE ARE RUNNING THESE TESTS!')

  describe('Page load Integration Tests', () => { 

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

    beforeEach( (done) => {
        chai.request(app)
        .post('/api/users')
        .type('form')
        .send(validUser)
        .end((err, res) => {

            chai.request(app)
            .post('/api/auth')
            .type('form')
            .send({ 
              "email": "test@test.com",
              "password": "Test1245"
            })
            .end((err, res) => {
              authToken = res.text
              done()
            })
        })
    })

    after( (done) => {
      console.log('Closing Connection')
      mongoose.connection.close(() => {
        done()
      })
    })


    describe('Successful Page Loads', () => {

      let decoded = JWT.decode(authToken)

      it('Succesfully Loads the Projects Page Data', (done) => {
        
        chai.request(app)
        .get('/projects')
        .set('Authorization', `Bearer ${authToken}`)
        .end((err, res) => {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body.projects).to.be.an('array')
            expect(res.body.projects[0]).to.have.nested.property('_id', decoded._id)
            done()
        })
      })

      it('Succesfully Loads the Account Details Page Data', (done) => {
        
        chai.request(app)
        .get('/account/details')
        .set('Authorization', `Bearer ${authToken}`)
        .end((err, res) => {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body.details).to.have.property('firstName', validUser.firstName)
            expect(res.body.details).to.have.property('lastName', validUser.lastName)
            expect(res.body.details).to.have.property('position', validUser.position)
            done()
        })
      })

      it('Succesfully Loads the Project Users Page Data', (done) => {
        
        chai.request(app)
        .get(`/project/${project._id}/users`)
        .set('Authorization', `Bearer ${authToken}`)
        .end((err, res) => {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body.users).to.be.an('array')
            expect(res.body.owner).to.have.nested.property('_id', decoded._id)
            done()
        })
      })

      it('Succesfully Loads the Project Page Data', (done) => {
        
        chai.request(app)
        .get(`/project/${project._id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .end((err, res) => {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body.project).to.exist
            done()
        })

      })

    })






  })

}