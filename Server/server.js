const express = require('express')
const app = express()
const moongoose = require('mongoose')
const User = require('./user');

//connect to mongodb
const dbURI = 'mongodb+srv://Sagar:sy_sagar123@authbackend.itvo8b6.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(dbURI, (err, db) => {
    if (err)
        console.log("error occured while connection")
    else {
        console.log('connected to db')
        //listen for request
        app.listen(3000)

        const myDb = db.db('myDb')
        const collection =myDb.collection('myTable')

        run();
    }
})

async function run() {

    //routes
    app.use(blogRoutes);
}