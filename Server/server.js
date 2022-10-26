const express = require('express')
const app = express()
const mongoose = require('mongoose');
const routes = require('./_routes');
const User = require('./user');
app.use(express.json())


//connect to mongodb
const dbURI = 'mongodb+srv://Sagar:sy_sagar123@authbackend.itvo8b6.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(dbURI, (err, db) => {
    if (err)
        console.log("error occured while connection")
    else {
        console.log('connected to db')
        //listen for request
        app.listen(3000)


        run();
    }
})

function run() {

    //routes
    app.use(routes);
}

