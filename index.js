const express = require('express')
var morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())

let notes = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "0400-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/info', (request, response) => {
  response.send(`<p>phonebook has info about ${notes.length} people </p> 
    <p>${Date()}</p>`)
})

app.get('/api/persons', (request, response) => {
  response.json(notes)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
  
    response.status(204).end()
})

const generateId = () => {
    return Math.floor(Math.random()*1000)
}
  
app.post('/api/persons', (request, response) => {
    const body = request.body
    const checklist = notes.find(guy => guy.name === body.name)

    if (!body.name || !body.number) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }

    if (checklist) {
        console.log(checklist)
        return response.status(400).json({ 
            error: 'name is already registered' 
          })
    }
  
    const note = {
      name: body.name,
      number: body.number,
      id: generateId(),
    }
    console.log(checklist)
    console.log(body.name)

    notes = notes.concat(note)
    response.json(note)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})