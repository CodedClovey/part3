const mongoose = require('mongoose')

mongoose.set('strictQuery',false)

const url = `mongodb+srv://clovey:atlaspass@cluster0.pfltgif.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
    name: String,
    number: Number,
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
const Guy = mongoose.model('Guy', personSchema)
module.exports = mongoose.model('Guy', personSchema)