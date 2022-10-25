const { query } = require('express')
const express = require('express')
const app = express()
const mongoClient = require('mongodb').MongoClient

const url = "mongodb://localhost:27017"

app.use(express.json()) // enables json parsing

mongoClient.connect(url,(err,db)=>{
    if(err)
    console.log("error occured while connection")
    else
    {
        const myDb = db.db('myDb')
        const collection =myDb.collection('myTable')

        app.post('/signup',(req,ers)=>{

            const newUser ={
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }

            const query = {email: newUser.email}
         collection.findOne(query,(err,result)=> {
            if(res==null)
            {
                collection.insertOne(newUser,(err,result)=>{
                    res.status(200).send()
                })
            }
            else
            {
                res.status(400).send()
            }
        })

    })

    app.post('/login',(erq,res)=>{
        const query ={
        email: res.body.email,
        password: res.body.password
        }

        collection.findOne(query,(err,result)=>{

            if(res!=null)
            {
                const objToSend = 
                {
                    name: result.name,
                    email: result.email
                }

                res.status(200).send(JSON.stringify(objToSend))
            }
            else{
                res.status(404).send()
            }
        })
    })

    }

})

app.listen(3000, ()=>{
    console.log("listening port 3000")
})