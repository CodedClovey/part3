const Guy = require('./models/note')

const express = require('express')
var morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(express.static('dist'))
app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())

/*

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

const generateId = () => {
    return Math.floor(Math.random()*1000)
}



app.delete('/api/persons/:id', (request, response) => {
  Guy.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})
*/

app.get('/api/persons', (request, response, next) => {
  Guy.find({}).then(notes => {
    response.json(notes)
  })
  .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
    Guy.findById(request.params.id).then(note => {
    if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body
    /*
    const checklist = Guy.find(guy => guy.name === body.name)

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
    */
    const note = new Guy({
      name: body.name,
      number: body.number,
    })

    note.save().then(savedNote => {
      response.json(savedNote)
    })
    .catch(error => next(error))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.use(errorHandler)