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
    res.json("You are signed in. Welcome", username);
});




module.exports = router;