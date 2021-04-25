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
    let count = await client.db("Reviews").collection("Reviews").countDocuments();

    await client.db("Reviews").collections("Reviews").insertOne({"reviewNumber" : count, "customerName" : customerName, "review" : review});
    res.status(200).json("Review Added");

})

router.route('/delete').post(async (req,res) =>{
    let reviewNumber = req.body.reviewNumber;

    await client.db("Reviews").collections("Reviews").deleteOne({"reviewNumber" : reviewNumber});
    res.status(200).json("Review Deleted");

})