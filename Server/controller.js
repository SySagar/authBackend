const User = require('./user')
const server_database=require('./server')
const myDb = server_database.db
const collection =server_database.collection

const login = (req, res) => {

    const query = {
        email: req.body.email, 
        password: req.body.password
    }

   


    collection.findOne(query, (err, result) => {

        if (result != null) {

            const objToSend = {
                name: result.name,
                email: result.email
            }

            res.status(200).send(JSON.stringify(objToSend))

        } else {
            res.status(404).send()
        }

    })

}


const signUp = (req, res) => {

    const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }

    const query = { email: newUser.email }
    collection.findOne(query, (err, result) => {

        if (result == null) {
            collection.insertOne(newUser, (err, result) => {
                res.status(200).send()
            })
        } else {
            res.status(400).send()
        }

    })

}



module.exports = {
    login:login,
    signUp:signUp
}