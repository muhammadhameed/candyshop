const router = require('express').Router();
const client = require('./connection');
const auth = require('../middleware/auth');

async function connectToDb(){
    await client.connect();
    console.log(client.isConnected());
}
connectToDb();

router.route('/').get(async (req,res)=>{
    let cursor = await client.db("Reviews").collection("Reviews").find({});
    let arr = new Array();
    await cursor.forEach(function  (doc) {arr.push(doc);});
    res.status(200).json(arr);
})

router.route('/add').post(async (req,res) =>{
    let customerName = req.body.customerName;
    let review = req.body.review;


    let found = await client.db("Users").collection("Customers").findOne({"name" : customerName});
    if(found ===null) {
        res.status(400).json("User does not exist");
        return;
    }
    
    found = await client.db("Reviews").collection("Reviews").find({}).sort({_id:-1}).limit(1);
    var count = 1;
    let arr = await found.toArray();
    if(typeof arr[0]!== "undefined"){
        count = arr[0].reviewNumber + 1;
    }
    await client.db("Reviews").collection("Reviews").insertOne({"reviewNumber" : count, "customerName" : customerName, "review" : review});
    res.status(200).json("Review Added");

})

router.route('/delete').post(async (req,res) =>{
    let reviewNumber = req.body.reviewNumber;

    await client.db("Reviews").collection("Reviews").deleteOne({"reviewNumber" : reviewNumber});
    res.status(200).json("Review Deleted");

})


module.exports = router;