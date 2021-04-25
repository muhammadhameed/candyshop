const router = require('express').Router();
const Joi = require('joi');
const client = require('./connection');
const bcrypt = require('bcrypt');
const generator = require('generate-password');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

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


router.route('/').get(async(req,res) =>{

    let cursor = await client.db("Users").collection("Pending Admin").find({});
    let arr = new Array();
    await cursor.forEach(function  (doc) {arr.push(doc);});
    res.status(200).json(arr);
})



router.route('/signupadmin').post( async (req,res) => {
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
    let found2 = await client.db("Users").collection("Pending Admin").findOne({"email" : email});
    if(found1 !==null || found2!== null) {
        res.status(400).json("User with this email already exists");
        return;
    }

    found = await client.db("Users").collection("Admin").findOne({"name" : name});
    found3 = await client.db("Users").collection("Pending Admin").findOne({"name" : name});
    if(found !==null || found3!== null) {
        res.status(400).json("User with this username already exists");
        return;
    }

    bcrypt.genSalt(10, async (err, salt) => {
        bcrypt.hash(password, salt, async (err,hash) => {
            if(err) throw err;
            const doc = {"firstName": firstName, "lastName" : lastName, "name": name, "email":email, "password":hash};
            await client.db("Users").collection("Pending Admin").insertOne(doc);
            let found = await client.db("Users").collection("Pending Admin").findOne({"name" : name});
            res.status(200).json("User added");
        });
    });

})


router.route('/approve').post(async (req,res) => {
    let name = req.found.name;
    let found = await client.db("Users").collection("Pending Admin").findOne({"name" : name});
    await client.db("Users").collection("Admin").insertOne(found);
    await client.db("Users").collection("Pending Admin").deleteOne({"name" : name});
    res.status(200).json("Admin Approved");
})

router.route('/delete').post(async (req,res) => {
    let name = req.found.name;
    let found = await client.db("Users").collection("Pending Admin").findOne({"name" : name});
    await client.db("Users").collection("Pending Admin").deleteOne({"name" : name});
    res.status(200).json("Admin Deleted");
})


router.route('/signinadmin').post( async (req,res) => {
    let email = req.body.email;
    let password = req.body.password;

    if(typeof email === "undefined" || typeof password === "undefined"){
        res.status(400).json("Please fill all spaces");
        return;
    }
    let found = await client.db("Users").collection("Admin").findOne({"email":email});
    if (found === null){
        res.status(400).json("Incorrect email");
        return;
    }

    bcrypt.compare(password, found.password, function(err, res) {
        if (res == true){
            jwt.sign(
                { id : found._id},
                process.env.jwtSecret,
                {expiresIn: 3600},

                (err,token) => {
                    if(err) throw err;
                    res.status(200).json({
                        token: token,
                        msg : "User Signed In"
                    });
                }
            )
        }
        else{
            res.status(400).json('Incorrect password')
        }
    });
    
});


router.route('/update').post(async (req, res) =>{
    let adminName = req.body.adminName;
    let whatToChange = req.body.whatToChange;
    let change = req.body.change;

    let found = await client.db("Users").collection("Admin").findOne({"name":adminName});
    let id = found._id;

    if (id == null)
    {
        res.status(400).json("The username entered is incorrect.");
        return;
    }

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

        bcrypt.compare(oldPassword, found.password, function(err, res) {
            if (res == true){
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(change, salt, (err,hash) => {
                        if(err) throw err;
                        found.password = hash;
                    });
                });
            }
            else{
                res.status(400).json('Old password is incorrect')
            }
        });
    }

    await client.db("Users").collection("Admin").updateOne({"_id": id}, {$set : found});
    res.status(200).json("Successfully updated admin details");
})


var nodeMailer = require('nodemailer');
router.route('/forgotPassword').post(async (req,res) => {
    let email = req.body.email;
    let found = await client.db("Users").collection("Admin").findOne({"email":email});
    
    if(found === null){
        res.status(400).json("Invalid email");
        return;
    }

    var transporter = nodeMailer.createTransport({
        service:'gmail',
        auth: {
            user: 'noreplycandyscape@gmail.com',
            pass: 'Group12-SE-Candyscape'
        }
    });

    var password = generator.generate({numbers:true});
    var mailOptions = {
        from: 'noreplycandyscape@gmail.com',
        to : email,
        subject: 'Password Candyscape',
        text : 'Your new password is ' + password
    };


    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            res.status(400).json(error);
        }
        else{
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, async (err,hash) => {
                    if(err) throw err;

                    await client.db("Users").collection("Admin").updateOne({"email" : email}, {$set: {"password" : hash}});
                    res.status(200).json('Email sent');
                });
            });
            
        }
    });
})


module.exports = router;