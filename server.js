// set up variables
const express = require('express')
const app = express()
const cors = require('cors')
const { response } = require('express')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

// variables for mongo connection
let db,
    dbConnectionString = process.env.DB_STRING,
    // db name should change to reflect the db for the app being built
    dbName = 'sample_mflix',
    collection 

// set up mongo connection
MongoClient.connect(dbConnectionString)
    .then(client => {
        console.log('Connected to Database')
        db = client.db(dbName)
        // 'comments' should change to reflect the collection for the app being built
        collection = db.collection('comments')
    })

// middleware
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors)

// allows server to serve up our index.ejs file
app.get('/', async (req, res) => {
    // try-catch block says to try this, or if that fails display the catch error message
    try {
        // send a response to request by rendering index.ejs file and display it
        response.render('index.ejs')
    } catch (error) {
        // if that response fails send this error message
        response.status(500).send({message: error.message})
    }
})

// set up port connecton
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on the port`)
})