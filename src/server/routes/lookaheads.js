const express = require("express")
const router = express.Router()
const Joi = require('joi')

const lookaheads = [
  { id: 1, name: "Lookahead1" },
  { id: 2, name: "Lookahead2" },
  { id: 3, name: "Lookahead3" },
  { id: 4, name: "Lookahead4" },
  { id: 5, name: "Lookahead5" },
]


// Lookahead Projects list route
router.get("/", (req, res) => {
  res.send(lookaheads);
});

// Lookahead Project view route
router.get("/:id", (req, res) => {
  const lookahead = lookaheads.find(c => c.id === parseInt(req.params.id))
  if (!lookahead) return res.status(404).send('The project with that ID was not found')

  const schema = {
    name: Joi.string().min(3).required()
  }
  const result = Joi.validate(req.body, schema)

  if (result.error) {
    // 400 Bad Request
    res.status(400).send(result.error.details[0].message)
    return
  }
  res.send(lookahead)
})

// Lookahead Projects POST route
router.post("/", (req, res) => {
  const schema = {
    name: Joi.string().min(3).required()
  }

  const result = Joi.validate(req.body, schema)

  if (result.error) return res.status(400).send(result.error.details[0].message)

  const lookahead = {
    id: lookaheads.length + 1,
    name: req.body.name
  }
  lookaheads.push(lookahead)
  res.send(lookahead)
})

// Lookahead Project PUT route
router.put('/:id', (req, res) => {
  const lookahead = lookaheads.find(c => c.id === parseInt(req.params.id))
  if (!lookahead) return res.status(404).send('The project with that ID was not found')

  const schema = {
    name: Joi.string().min(3).required()
  }
  const result = Joi.validate(req.body, schema)

  if (result.error) {
    // 400 Bad Request
    res.status(400).send(result.error.details[0].message)
    return
  }
  res.send(lookahead)
})

router.delete('/:id', (req, res) => {
  const lookahead = lookaheads.find(c => c.id === parseInt(req.params.id))
  if (!lookahead) return res.status(404).send('The project with that ID was not found')

    const schema = {
    name: Joi.string().min(3).required()
  }
  const result = Joi.validate(req.body, schema)

  if (result.error) {
    // 400 Bad Request
    res.status(400).send(result.error.details[0].message)
    return
  }
  const index = lookaheads.indexOf(lookahead)
  lookaheads.splice(index, 1)

  res.send(lookahead)
})

module.exports = router