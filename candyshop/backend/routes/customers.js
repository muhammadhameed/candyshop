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


    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err,hash) => {
            if(err) throw err;
            const doc = {"firstName": firstName, "lastName": lastName, "name" : name, "email":email, "password":hash, "phoneNumber":phoneNumber};
            await client.db("Users").collection("Customers").insertOne(doc);
            let found = await client.db("Users").collection("Customers").findOne({"name" : name});

            jwt.sign(
                { id : found._id},
                process.env.jwtSecret,
                {expiresIn: 3600},

                (err,token) => {
                    if(err) throw err;
                    res.status(200).json({
                        token: token,
                        msg : "User Added"
                    });
                }
            )

        });
    });

    

})


router.route('/signin').post(async (req,res) => {
    let email = req.body.email;
    let password = req.body.password;
    if(typeof email === "undefined" || typeof password === "undefined"){
        res.status(400).json("Please fill all spaces");
        return;
    }

    let found = await client.db("Users").collection("Customers").findOne({"email":email});
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
            res.status(400).json('Incorrect password');
        }
    });
})


router.route('/update').post(async (req, res) =>{
    let customerName = req.body.customerName;
    let whatToChange = req.body.whatToChange;
    let change = req.body.change;

    let found = await client.db("Users").collection("Customers").findOne({"name":customerName});
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

    else if (whatToChange == "phoneNumber"){
        found.phoneNumber = change;
    }

    await client.db("Users").collection("Customers").updateOne({"_id": id}, {$set : found});
    res.status(200).json("Successfully updated customer details");
})


var nodeMailer = require('nodemailer');
router.route('/forgotPassword').post(async (req,res) => {
    let email = req.body.email;
    let found = await client.db("Users").collection("Customers").findOne({"email":email});
    
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
                bcrypt.hash(password, salt, (err,hash) => {
                    if(err) throw err;

                    await client.db("Users").collection("Customers").updateOne({"email" : email}, {$set: {"password" : hash}});
                    res.status(200).json('Email sent');
                });
            });
            
        }
    });
})




module.exports = router;

