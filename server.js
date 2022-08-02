const express = require('express')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 8000
const MongoClient = require('mongodb').MongoClient

let db, 
    dbConnectionStr = 'mongodb+srv://eryan411:testserver123@cluster0.701bxt1.mongodb.net/?retryWrites=true&w=majority'
    dbName = 'artist'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })
// => Here we expose the views so it can be rendered.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// => Here we expose the dist folder
app.use(express.static(path.join(__dirname, 'dist')))


app.get('/', (req, res) => {
    db.collection('artists').find().sort({likes: -1}).toArray()
    .then(data => {
        res.render('index.ejs', {info: data})
    })
})

app.listen(PORT, () => {
    console.log(`Server is now running on ${PORT}`)
})