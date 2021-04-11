const router = require('express').Router();
var client = require('./connection');

async function connectToDb(){
    await client.connect();
    console.log(client.isConnected());
}
connectToDb();

router.route('/').get(async (req,res) =>{
    let customerName = req.body.customerName;

    let found = await client.db("Users").collection("Customers").findOne({"name": customerName});
    let arr = new Array();
    await cursor.forEach(function  (doc) {arr.push(doc);});
    res.json(arr);
})


router.route('/add').post(async (req,res) =>{
    let customerName = req.body.customerName;
    let productName = req.body.productName;
    let quantity = req.body.quantity;

    let found = await client.db("Users").collection("Customers").findOne({"name": customerName});
    let foundProduct = await client.db("Product").collection("Candy").findOne({"name":productName});
    price = foundProduct.price;

    if(typeof (found.shoppingCart) === "undefined"){
        let AddToCart = [{"name" : productName, "quantity":quantity, "price": price*quantity}];
        await client.db("Users").collection("Customers").updateOne({"name": customerName}, {$set: {"shoppingCart": AddToCart}});
        res.json("Successfully added to shopping cart");
        return;
    }

    let Cart = found.shoppingCart;  //this is the shopping cart already found in the database for that user
    for (let i =0; i<Cart.length; i++){ //this loop is used to see if the product has already been added to shopping cart
        if(Cart[i].name === productName){
            Cart[i].quantity = Cart[i].quantity + quantity;
            Cart[i].price = Cart[i].quantity * price;
            await client.db("Users").collection("Customers").updateOne({"name": customerName}, {$set: {"shoppingCart": Cart}});
            res.json("Successfully added to shopping cart"); 
            return;
        }
    }
    
    let AddToCart = {"name" : productName, "quantity":quantity, "price": price*quantity};
    Cart.push(AddToCart);
    await client.db("Users").collection("Customers").updateOne({"name": customerName}, {$set: {"shoppingCart": Cart}});
    res.json("Successfully added to shopping cart");
})



router.route('/update').post(async (req,res) =>{
    let customerName = req.body.customerName; 
    let productName = req.body.productName; 
    let operation = req.body.operation;
    let quantityChange = req.body.quantityChange;

    let foundCustomer = await client.db("Users").collection("Customers").findOne({"name": customerName});
    let cart = foundCustomer.shoppingCart;
    
    if(operation === "add"){
        for (let i = 0; i<cart.length; i++){
            if(cart[i].name === productName){
                let price = cart[i].price / cart[i].quantity;
                cart[i].quantity = cart[i].quantity + quantityChange;
                cart[i].price = cart[i].quantity * price;
                await client.db("Users").collection("Customers").updateOne({"name": customerName}, {$set: {"shoppingCart": cart}});
                console.log("Successfully updated shopping cart"); 
                return;
            }
        }
    }

    else if(operation === "subtract"){
        for (let i = 0; i<cart.length; i++){
            if(cart[i].name === productName){
                let price = cart[i].price / cart[i].quantity;
                cart[i].quantity = cart[i].quantity - quantityChange;
                cart[i].price = cart[i].quantity * price;

                if (cart[i].quantity === 0){
                    cart.splice(i,1);
                }
                await client.db("Users").collection("Customers").updateOne({"name": customerName}, {$set: {"shoppingCart": cart}});
                console.log("Successfully updated shopping cart"); 
                return;
            }
        }
    }
})

// router.route('/add').post(async(req,res)=>){
//     let customerName = req.body.customerName;
//     let productName = req.body.productName;
//     let collectionName = req.body.collectionName;
//     let quantity = req.body.quantity;
//     let price;

//     let found = await client.db("Users").collection("Customers").findOne({"name": customerName});
//     let foundProduct = await client.db("Product").collection(collectionName).findOne({"name":productName}); 

//     if (typeof foundProduct.price !== "undefined"){
//         price = foundProduct.price;
//     }


// }


module.exports = router;