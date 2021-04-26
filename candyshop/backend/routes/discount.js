const router = require('express').Router();
const client = require('./connection');
const auth = require('../middleware/auth');

async function connectToDb(){
    await client.connect();
    console.log(client.isConnected());
}
connectToDb();

router.route('/').get(async(req,res) =>{

    let cursor = await client.db("Product").collection("Candy").find({});
    let arr = new Array();
    await cursor.forEach(function  (doc) {arr.push(doc);});
    res.status(200).json(arr);
})

router.route('/add').post(async (req,res) => {
    let discountCode = req.body.discountCode;
    let discount = req.body.discount;
    let cursor = await client.db('Discount').collection('New Discount').find({})
    await cursor.forEach( async function (doc) {await client.db('Discount').collection('Old Discount').insertOne(doc)} );
    
    await client.db('Discount').collection('New Discount').insertOne({'discountCode' : discountCode, 'discount' : discount, 'date' : client.Date()});
})

router.route('/delete').post(async (req,res) => {
    let discountCode = req.body.discountCode;
    let found = await client.db('Discount').collection('New Discount').findOne({'discountCode' : discountCode});
    await client.db('Discount').collection('Old Discount').insertOne(found);
    await client.db('Discount').collection('New Discount').deleteOne({'discountCode' : discountCode});
})

module.exports = router;