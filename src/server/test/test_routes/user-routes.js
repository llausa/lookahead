
process.env.NODE_ENV = 'test'

const app = require('../../index')
const mongoose = require("mongoose")
const chai = require('chai')
const chaiHttp = require('chai-http')
const chaiAsPromised = require("chai-as-promised")
const expect = chai.expect
chai.use(chaiAsPromised)
chai.use(chaiHttp)

// console.log(mongoose.connection.name)

if (mongoose.connection.name == 'lookahead-test') {

  describe('Integration Tests', () => { 

    beforeEach( (done) => { 
      mongoose.connection.db.dropDatabase(() => {
        done()
      })})

    after( (done) => {
      mongoose.connection.close(() => {
        done()
      })
    })



    it('Succesfully Registers an Account', (done) => {
      chai.request(app)
      .post('/api/users')
      // .type('form')
      .send({ 
        "firstName": "Ben",
        "lastName": "Ulcoq",
        "position": "CEO",
        "email": "ben@testerino.com",
        "password": "Test1245"
      })
      .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(201)
          expect(res.body.message).to.equal('User for ben@testerino.com successfully created.')
          done()
      })
    })

  })
}