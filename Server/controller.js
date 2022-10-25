const User = require('./user')

const login = (req, res) => {


    const newuser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    newuser.save().then((result) => {
        res.send(result)
    }).catch((err) => {
        console.log(err);
    });

    //making a query
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

};


const signUp = (req, res) => {
    const newuser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    newuser.save().then((result) => {
        res.send(result)
    }).catch((err) => {
        console.log(err);
    });



    //making a query
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


};

module.export = {
    login,
    signUp
}