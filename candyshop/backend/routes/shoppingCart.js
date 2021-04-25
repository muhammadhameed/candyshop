const router = require('express').Router();
const client = require('./connection');
const auth = require('../middleware/auth');

async function connectToDb(){
    await client.connect();
    console.log(client.isConnected());
}
connectToDb();


router.route('/').get(async (req,res) =>{
    let customerName = req.body.customerName;

    let found = await client.db("Users").collection("Customers").findOne({"name": customerName});
    res.status(200).json(found.shoppingCart);
})


router.route('/update').post(async (req,res) =>{
    let customerName = req.body.customerName;
    let shoppingCart = req.body.shoppingCart;

    await client.db("Users").collection("Customers").updateOne({"name" : customerName}, {$set: {"shoppingCart": shoppingCart}});
    res.status(200).json("Successfully updated shopping cart")
})


router.route('/checkout').post(async (req,res) => {
    let customerName = req.body.customerName;
    let address = req.body.address;
    let paymentDetails = req.body.paymentDetails;

    // validate address, how?
    
    let found = await client.db("Users").collection("Customers").findOne({"name":customerName});
    //await client.db("Users").collection("Customers").updateOne({"name" : customerName}, {$set: {"address": address}});
    //above line depends on if we're storing address

    let price = 0;
    for(let i = 0; i<found.shoppingCart.length; i++){
        price += found.shoppingCart[i].price;
    }

    let count = await client.db("Orders").collection("Pending Orders").countDocuments();
    let count1 = await client.db("Orders").collection("Confirmed Orders").countDocuments();
    let orderNumber = count + count1;

    let doc = {
        "orderNumber" : orderNumber,
        "customerName" : found.name,
        "products" : found.shoppingCart,
        "totalPrice" : price,
        "address" : address,
        "paymentDetails" : paymentDetails,
        "date" : client.Date()
    };
    await client.db("Orders").collection("Pending Orders").insertOne({doc});
    
    
    for (let i = 0; i<found.shoppingCart.length; i++){ // to update product quantities
        for (let j = 0; j<found.shoppingCart[i].names.length; j++){
            let foundProduct = await client.db("Product").collection("Candy").findOne({"name" : found.shoppingCart[i].name[j]});
            let quantity = foundProduct.quantity; 
            quantity = quantity - found.shoppingCart[i].quantity[j];
            await client.db("Product").collection("Candy").updateOne({"name" : found.shoppingCart[i].name[j] }, {$set : {"quantity" : quantity}})
        }
    }

    await client.db("Users").collection("Customers").updateOne({"name" : customerName}, {$unset: {shoppingCart: ""}});
    res.status(200).json("Successful Checkout");
})



// router.route('/add').post(async(req,res)=>{
//     let customerName = req.body.customerName;
//     let productName = req.body.productName;
//     let collectionName = req.body.collectionName;
    
//     let found = await client.db("Users").collection("Customers").findOne({"name": customerName});
//     let foundProduct = await client.db("Product").collection(collectionName).findOne({"name":productName});
    
//     if(typeof (foundProduct.price) !== "undefined"){ //this means this is a box
//         price = foundProduct.price;

//         let AddToCart = [{"Box" : productName, "insideBox" : {"price" : price, "name": new Array(), "quantity": new Array()}}]; //this is box when shoppingCart is not empty
//         await client.db("Users").collection("Customers").updateOne({"name": customerName}, {$set: {"shoppingCart": AddToCart}});
//         res.status(200).json("Successfully added to shopping cart");
//         return;
//     }

//     else{ //this is not box. Tell frontend that if the person clicks on add to cart on candy after box is full then they should display error message again
        
//         if(typeof (found.shoppingCart) === "undefined"){
//             res.status(400).json("Please select a box first");
//             return;
//         }

//         let Cart = found.shoppingCart;
//         let length = Cart.length;
//         length = length - 1;
//         let foundBox = await client.db("Product").collection("Boxes").findOne({"name":Cart[length].Box});
        
//         if (typeof (Cart[length].insideBox.quantity) !== "undefined"){
//             if (foundBox.quantity === (Cart[length].insideBox.quantity.reduce((a, b) => a + b, 0))){
//                 res.status(400).json("Box is full. Get a new box");
//                 return;
//             }
//         }
        

//         let CartNames = Cart[length].insideBox.name;
//         let CartQuantities = Cart[length].insideBox.quantity;

//         if (typeof (Cart[length].insideBox.name) !== "undefined"){
//             for (let i = 0; i<CartNames.length; i++){
//                 if (CartNames[i] === productName){
//                     CartQuantities[i] = CartQuantities[i] + 10;
//                     await client.db("Users").collection("Customers").updateOne({"name": customerName}, {$set: {"shoppingCart": Cart}});
//                     res.status(200).json("Successfully added to shopping cart");
//                     return;
//                 }
//             }
//         }

//         CartNames.push(productName);
//         CartQuantities.push(10);
//         await client.db("Users").collection("Customers").updateOne({"name": customerName}, {$set: {"shoppingCart": Cart}});
//         res.status(200).json("Successfully added to shopping cart");
        
//     }
// })


router.route('/add').post(async(req,res)=>{
    let customerName = req.body.customerName;
    let boxName = req.body.boxName;
    let names = req.body.names;
    let quantities = req.body.quantities;
    
    let found = await client.db("Users").collection("Customers").findOne({"name": customerName});
    let foundBox = await client.db("Product").collection("Boxes").findOne({"name":productName});
    price = foundBox.price;


    for (let i = 0; i<names.length; i++){
        let foundProduct = await client.db("Product").collection("Candy").findOne({"name" : names[i]})
        if (quantities[i] > foundProduct.quantity){
            res.status(400).json("Product out of stock ", foundProduct.quantity, " available");
        }
    }

    if (typeof found.shoppingCart === "undefined"){
        let AddToCart = [{"Box" : boxName, "name": names, "quantity": quantities, "price": price}]; 
        await client.db("Users").collection("Customers").updateOne({"name": customerName}, {$set: {"shoppingCart": AddToCart}});
        res.status(200).json("Successfully added to shopping cart");
        return;
    }
    
    let AddToCart = {"Box" : boxName, "name": names, "quantity": quantities, "price": price};
    let Cart = found.shoppingCart;
    Cart.push(AddToCart);
    await client.db("Users").collection("Customers").updateOne({"name": customerName}, {$set: {"shoppingCart": Cart}});
    res.status(200).json("Successfully added to shopping cart");

})



module.exports = router;