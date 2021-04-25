const router = require('express').Router();
const client = require('./connection');
const auth = require('../middleware/auth');

async function connectToDb(){
    await client.connect();
    console.log(client.isConnected());
}
connectToDb();

router.route('/').post( async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if(typeof email === "undefined" || typeof password === "undefined"){
        res.status(400).json("Please fill all spaces");
        return;
    }
    let found = await client.db("Users").collection("Customers").findOne({"email":email, "password":password});
    let found1 = await client.db("Users").collection("Admin").findOne({"email":email, "password":password});

    if (found === null && found1 === null){
        res.status(400).json("Incorrect details");
        return;
    }

    if (found!== null){
        res.status(200).json("Success customer signed in");
    }
    if (found1 !== null){
        res.status(200).json("Success admin signed in");
    }


})

module.exports = router;