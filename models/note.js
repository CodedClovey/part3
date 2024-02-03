const mongoose = require('mongoose')
require('dotenv').config()

mongoose.set('strictQuery',false)

//const url  = process.env.MONGODB_URI
//console.log(url)
const url = 'mongodb+srv://clovey:atlaspass@cluster0.pfltgif.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB', result)
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

module.exports = mongoose.model('Guy', personSchema)