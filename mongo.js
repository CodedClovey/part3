const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const personSchema = new mongoose.Schema({
    name: String,
    number: Number,
  })

const Guy = mongoose.model('Guy', personSchema)

const url =
  `mongodb+srv://clovey:${password}@cluster0.pfltgif.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

if (process.argv.length=3) {
    Guy.find({}).then(result => {
        result.forEach(guy => {
            console.log(guy.name, guy.number)
        })
    mongoose.connection.close()
    })
}
else{
    const guyname = process.argv[3]
    const guynumber = process.argv[4]

    const note = new Guy({
        name: guyname,
        number: guynumber,
    })
      
    note.save().then(result => {
        console.log('note saved!',guyname, guynumber)
        mongoose.connection.close()
    })
}




