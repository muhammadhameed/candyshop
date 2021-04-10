const router = require('express').Router();
var client = require('./connection');

async function connectToDb(){
    await client.connect();
    console.log(client.isConnected());
}
connectToDb();

router.route('/signinadmin').get( async (req,res) => {
    let email = req.body.email;
    let password = req.body.password;
    if(typeof email === "undefined" || typeof password === "undefined"){
        res.status(400).json("Please fill all spaces");
        return;
    }
    let found = await client.db("Users").collection("Admin").findOne({"email":email, "password":password});
    if (found === null){
        res.status(400).json("Please enter your details again");
        return;
    }
    res.json("You are signed in. Welcome.");
});

router.route('/signupadmin').get( async (req,res) => {
    let email = req.body.email;
    let password = req.body.password;
    if(typeof email === "undefined" || typeof password === "undefined"){
        res.status(400).json("Please fill all spaces");
        return;
    }

    let found1 = await client.db("Users").collection("Admin").findOne({"email" : cus.email});
    if(found1 !==null) {
        //console.log("Admin with this email already exists");
        res.status(400).json("User with this email already exists");
        return;
    }

    let found = await client.db("Users").collection("Admin").findOne({"email":email, "password":password});
    if (found === null){
        res.status(400).json("Please enter your details again");
        return;
    }

    const doc = {"email":cus.email, "password":cus.password};
    try {
            await client.db("Users").collection("Admin").insertOne(doc);
        } catch (e) {
            console.log(e);
    };
    res.json("Welcome.");
});




module.exports = router;