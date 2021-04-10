const router = require('express').Router();
var client = require('./connection');

async function connectToDb(){
    await client.connect();
    console.log(client.isConnected());
}
connectToDb();

router.route('/').post( async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if(typeof email === "undefined" || typeof password === "undefined"){
        res.error(400).json("Please fill all spaces");
        return;
    }
    let found = await client.db("Users").collection("Customers").findOne({"email":email, "password":password});
    let found1 = await client.db("Users").collection("Admin").findOne({"email":email, "password":password});

    if (found === null && found1 === null){
        res.error(400).json("Incorrect details");
        return;
    }

    if (found!== null){
        res.json("Success customer signed in");
    }
    if (found1 !== null){
        res.json("Success admin signed in");
    }


})

module.exports = router;