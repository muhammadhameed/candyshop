const router = require('express').Router();
var client = require('./connection');

async function connectToDb(){
    await client.connect();
    console.log(client.isConnected());
}
connectToDb();

router.route('/signup').post(async (req,res) => {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;
    let phoneNumber = req.body.phoneNumber;
    if(typeof email === "undefined" || typeof password === "undefined" || typeof username === "undefined" || typeof phoneNumber === "undefined"){
        res.status(400).json('Please fill all the fields');
        return;
    }

    let found = await client.db("Users").collection("Customers").findOne({"email" : email});
    if(found !==null) {
        res.status(400).json("User with this email already exists");
        return;
    }
    found = await client.db("Users").collection("Customers").findOne({"name" : username});
    if(found !==null) {
        res.status(400).json("User with this username already exists");
        return;
    }
    const doc = {"name" : username, "email":email, "password":password, "phoneNumber":phoneNumber};
    await client.db("Users").collection("Customers").insertOne(doc);
    res.json("User Added");

})

router.route('/signin').post(async (req,res) => {
    let email = req.body.email;
    let password = req.body.password;
    if(typeof email === "undefined" || typeof password === "undefined"){
        res.error(400).json("Please fill all spaces");
        return;
    }
    let found = await client.db("Users").collection("Customers").findOne({"email":email, "password":password});
    if (found === null){
        res.error(400).json("Incorrect details");
        return;
    }
    res.json("Sucess. You are signed in");
})

router.route('/update').post(async (req, res) =>{
    let customerName = req.body.customerName;
    let whatToChange = req.body.whatToChange;
    let change = req.body.change;
    
    let found = await client.db("Users").collections("Customers").findOne({"name":customerName});
    let id = found._id;

    if(whatToChange == "username"){
        found.name = change;
    }
    else if (whatToChange == "email"){
        found.email = change;
    }
    else if (whatToChange == "password"){
        found.password = change;
    }
    else if (whatToChange == "phoneNumber"){
        found.phoneNumber = change;
    }

    await client.db("Product").collection("Candy").updateOne({"_id": id}, {$set : found});

})



module.exports = router;