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


router.route('/add').post( async (req,res) => { 
    let productName = req.body.productName;
    let collectionName = req.body.collectionName;
    let price = req.body.price;
    let quantity = req.body.quantity;

    let found = await client.db("Product").collection(collectionName).findOne({"name" : productName});
    if (found !== null){
        res.status(400).json("A product with this name already exists");
        return;
    }

    if (typeof (price) === "undefined"){
        await client.db("Product").collection(collectionName).insertOne({"name":productName, "quantity":quantity});
        res.status(200).json("Product successfully added");
        return;
    }
    
    await client.db("Product").collection(collectionName).insertOne({"name":productName, "price": price});
    res.status(200).json("Product successfully added");

})


router.route('/update').post(async(req,res) => {
    let productName = req.body.productName;
    let collectionName = req.body.collectionName;
    let whatToChange = req.body.whatToChange;
    let change = req.body.change;
    let operation = req.body.operation;

    let found = await client.db("Product"). collection(collectionName).findOne({"name":productName});
    let id = found._id;

    if (whatToChange === "price"){
        if (operation === "add"){
            found.price = found.price + change;
        }
        else if (operation === "subtract"){
            found.price = found.price - change;
        }
    }

    else if(whatToChange === "quantity"){
        if (operation === "add"){
            found.quantity = found.quantity + change;
        }
        else if (operation === "subtract"){
            found.quantity = found.quantity - change;
        }
    }

    else if(whatToChange === "name"){
        found.name = change;
    }
    await client.db("Product").collection(collectionName).updateOne({"_id": id}, {$set : found});
    res.status(200).json("Successfully updated product details");
})


module.exports = router;