const express = require('express')
const app = express()
const mongoClient = require('mongodb').MongoClient
const mongoose = require('mongoose');
const routes = require('./_routes');
const User = require('./user');
app.use(express.json())


//connect to mongodb
const dbURI = 'mongodb+srv://Sagar:sy_sagar123@authbackend.itvo8b6.mongodb.net/?retryWrites=true&w=majority'
mongoClient.connect(dbURI, (err, db) => {
    if (err)
        console.log("error occured while connection")
    else {
        console.log('connected to db')
        //listen for request
        app.listen(3000)

        const myDb = db.db('myDb')
        const collection =myDb.collection('myTable')

        module.exports = {myDb,collection}

        run();
    }
})

async function run() {

    //routes
    app.use(routes);
}

