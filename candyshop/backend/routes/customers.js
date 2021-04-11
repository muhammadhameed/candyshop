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
    min: 5,
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
    name: Joi.string().required(),
    email: Joi.string().trim().email().required(),
    password: passwordComplexity(complexityOptions),
    phoneNumber: Joi.number().required().integer().min(999999999).max(999999999999) //this allows the number to be of 11 digits

});

router.route('/signup').post(async (req,res) => {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let phoneNumber = req.body.phoneNumber;

    let data = req.body;

    const validation = schema.validate(data);
    if(validation.error)
    {
        res.status(400).json('Error' + validation.error);
        return;
    }
    

    let found = await client.db("Users").collection("Customers").findOne({"email" : email});
    if(found !==null) {
        res.status(400).json("User with this email already exists");
        return;
    }
    found = await client.db("Users").collection("Customers").findOne({"name" : name});
    if(found !==null) {
        res.status(400).json("User with this username already exists");
        return;
    }
    const doc = {"firstName": firstName, "lastName": lastName, "name" : name, "email":email, "password":password, "phoneNumber":phoneNumber};
    await client.db("Users").collection("Customers").insertOne(doc);
    res.status(200).json("User Added");

})


router.route('/signin').post(async (req,res) => {
    let email = req.body.email;
    let password = req.body.password;
    if(typeof email === "undefined" || typeof password === "undefined"){
        res.status(400).json("Please fill all spaces");
        return;
    }
    let found = await client.db("Users").collection("Customers").findOne({"email":email, "password":password});
    if (found === null){
        res.status(400).json("Incorrect details");
        return;
    }
    res.status(200).json("Sucess. You are signed in");
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
    else if(whatToChange == "firstName"){
        found.firstName = change;
    }
    else if(whatToChange == "lastName"){
        found.lastName = change;
    }
    else if (whatToChange == "email"){
        found.email = change;
    }
    else if (whatToChange == "password"){
        let oldPassword = req.body.oldPassword;
        if (found.password !== oldPassword){
            res.status(400).json("Old password is incorrect");
            return;
        }
        found.password = change;
    }
    else if (whatToChange == "phoneNumber"){
        found.phoneNumber = change;
    }

    await client.db("Users").collection("Customers").updateOne({"_id": id}, {$set : found});
    res.status(200).json("Successfully updated customer details");
})




module.exports = router;