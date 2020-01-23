const express = require("express")
const Joi = require('joi')

const app = express();
app.use(express.json())

const port = process.env.PORT || 3000;

const lookaheads = [
  { id: 1, name: "Lookahead1" },
  { id: 2, name: "Lookahead2" },
  { id: 3, name: "Lookahead3" },
  { id: 4, name: "Lookahead4" },
  { id: 5, name: "Lookahead5" },
]

// landing page route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Lookahead Projects list route
app.get("/api/lookaheads", (req, res) => {
  res.send(lookaheads);
});

// Lookahead Project view route
app.get("/api/lookaheads/:id", (req, res) => {
  const lookahead = lookaheads.find(c => c.id === parseInt(req.params.id))
  if (!lookahead) return res.status(404).send('The project with that ID was not found')
  res.send(lookahead)
})

// Lookahead Projects POST route
app.post("/api/lookaheads", (req, res) => {
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
app.put('/api/lookaheads/:id', (req, res) => {
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

app.delete('/api/lookaheads/:id', (req, res) => {
  const lookahead = lookaheads.find(c => c.id === parseInt(req.params.id))
  if (!lookahead) return res.status(404).send('The project with that ID was not found')

  const index = lookaheads.indexOf(lookahead)
  lookaheads.splice(index, 1)

  res.send(lookahead)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));