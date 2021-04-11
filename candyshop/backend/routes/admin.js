const router = require('express').Router();
const Joi = require('joi');
var client = require('./connection');

async function connectToDb(){
    await client.connect();
    console.log(client.isConnected());
}
connectToDb();


const complexityOptions = {
    string: true,
    required: true,
    trim:true,
    min: 8,
    max: 30,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1, 
    requirementCount: 3,
  };

const passwordComplexity = require("joi-password-complexity"); 
const schema = Joi.object().keys({ //adjust this to how the body sends the data 
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    // name: Joi.string().trim().required(),
    email: Joi.string().trim().email().required(),
    password: passwordComplexity(complexityOptions),

});


router.route('/signupadmin').post( async (req,res) => {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    // let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;

    let data = req.body;
    
    const validation = schema.validate(data);
    if(validation.error)
    {
        res.status(400).json('Error' + validation.error);
        return;
    }
    

    let found = await client.db("Users").collection("Admin").findOne({"email" : email});
    if(found !==null) {
        res.status(400).json("User with this email already exists");
        return;
    }
    // found = await client.db("Users").collection("Admin").findOne({"name" : name});
    // if(found !==null) {
    //     res.status(400).json("User with this username already exists");
    //     return;
    // }
    const doc = {"firstName": firstName, "lastName" : lastName,  "email":email, "password":password};
    await client.db("Users").collection("Admin").insertOne(doc);
    res.json("User Added");

})



router.route('/signinadmin').post( async (req,res) => {
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




module.exports = router;