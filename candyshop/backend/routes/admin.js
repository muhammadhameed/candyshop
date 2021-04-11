const router = require('express').Router();
const Joi = require('joi');
const client = require('./connection');

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
    name: Joi.string().trim().required(),
    email: Joi.string().trim().email().required(),
    password: passwordComplexity(complexityOptions),

});

router.route('/signupadmin').post( async (req,res) => { //this is for the case front end doesnt implement approval
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;

    let data = req.body;
    
    const validation = schema.validate(data);
    if(validation.error)
    {
        res.status(400).json('Error' + validation.error);
        return;
    }
    

    let found1 = await client.db("Users").collection("Admin").findOne({"email" : email});
    if(found1 !==null) {
        res.status(400).json("User with this email already exists");
        return;
    }

    found = await client.db("Users").collection("Admin").findOne({"name" : name});
    if(found !==null) {
        res.status(400).json("User with this username already exists");
        return;
    }
    const doc = {"firstName": firstName, "lastName" : lastName, "name": name,  "email":email, "password":password};
    await client.db("Users").collection("Admin").insertOne(doc);
    res.status(200).json("User Added");

})

// router.route('/signupadmin').post( async (req,res) => {
//     let firstName = req.body.firstName;
//     let lastName = req.body.lastName;
//     let name = req.body.name;
//     let email = req.body.email;
//     let password = req.body.password;

//     let data = req.body;
    
//     const validation = schema.validate(data);
//     if(validation.error)
//     {
//         res.status(400).json('Error' + validation.error);
//         return;
//     }
    

//     let found1 = await client.db("Users").collection("Admin").findOne({"email" : email});
//     let found2 = await client.db("Users").collection("Pending Admin").findOne({"email" : email});
//     if(found1 !==null || found2!== null) {
//         res.status(400).json("User with this email already exists");
//         return;
//     }

//     found = await client.db("Users").collection("Admin").findOne({"name" : name});
//     found3 = await client.db("Users").collection("Pending Admin").findOne({"name" : name});
//     if(found !==null || found3!== null) {
//         res.status(400).json("User with this username already exists");
//         return;
//     }

//     const doc = {"firstName": firstName, "lastName" : lastName, "name": name, "email":email, "password":password};
//     await client.db("Users").collection("Pending Admin").insertOne(doc);
//     res.status(200).json("User Added");

// })

// router.route('/approve').post(async (req,res) => {
//     let name = req.found.name;
//     let found = await client.db("Users").collection("Pending Admin").findOne({"name" : name});
//     await client.db("Users").collection("Admin").insertOne(found);
//     await client.db("Users").collection("Pending Admin").deleteOne({"name" : name});
//     res.status(200).json("Admin Approved");
// })

// router.route('/delete').post(async (req,res) => {
//     let name = req.found.name;
//     let found = await client.db("Users").collection("Pending Admin").findOne({"name" : name});
//     await client.db("Users").collection("Pending Admin").deleteOne({"name" : name});
//     res.status(200).json("Admin Deleted");
// })

router.route('/signinadmin').post( async (req,res) => {
    let email = req.body.email;
    let password = req.body.password;

    if(typeof email === "undefined" || typeof password === "undefined"){
        res.status(400).json("Please fill all spaces");
        return;
    }
    let found = await client.db("Users").collection("Admin").findOne({"email":email, "password":password});
    if (found === null){
        res.status(400).json("Incorrect details added. Please try again.");
        return;
    }
    res.status(200).json("You are signed in. Welcome.");
});




module.exports = router;