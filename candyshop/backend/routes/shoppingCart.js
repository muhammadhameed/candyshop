const router = require('express').Router();
const client = require('./connection');

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
    res.status(200).json(arr);
})


//need to change update 
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
                res.status(200).json("Successfully updated shopping cart"); 
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
                res.status(200).json("Successfully updated shopping cart"); 
                return;
            }
        }
    }
})



router.route('/add').post(async(req,res)=>{
    let customerName = req.body.customerName;
    let productName = req.body.productName;
    let collectionName = req.body.collectionName;
    
    let found = await client.db("Users").collection("Customers").findOne({"name": customerName});
    let foundProduct = await client.db("Product").collection(collectionName).findOne({"name":productName});
    
    if(typeof (foundProduct.price) !== "undefined"){ //this means this is a box
        price = foundProduct.price;

        let AddToCart = [{"Box" : productName, "insideBox" : {"price" : price, "name": new Array(), "quantity": new Array()}}]; //this is box when shoppingCart is not empty
        await client.db("Users").collection("Customers").updateOne({"name": customerName}, {$set: {"shoppingCart": AddToCart}});
        res.status(200).json("Successfully added to shopping cart");
        return;
    }

    else{ //this is not box. Tell frontend that if the person clicks on add to cart on candy after box is full then they should display error message again
        
        if(typeof (found.shoppingCart) === "undefined"){
            res.status(400).json("Please select a box first");
            return;
        }

        let Cart = found.shoppingCart;
        let length = Cart.length;
        length = length - 1;
        let foundBox = await client.db("Product").collection("Boxes").findOne({"name":Cart[length].Box});
        
        if (typeof (Cart[length].insideBox.quantity) !== "undefined"){
            if (foundBox.quantity === (Cart[length].insideBox.quantity.reduce((a, b) => a + b, 0))){
                res.status(400).json("Box is full. Get a new box");
                return;
            }
        }
        

        let CartNames = Cart[length].insideBox.name;
        let CartQuantities = Cart[length].insideBox.quantity;

        if (typeof (Cart[length].insideBox.name) !== "undefined"){
            for (let i = 0; i<CartNames.length; i++){
                if (CartNames[i] === productName){
                    CartQuantities[i] = CartQuantities[i] + 10;
                    await client.db("Users").collection("Customers").updateOne({"name": customerName}, {$set: {"shoppingCart": Cart}});
                    res.status(200).json("Successfully added to shopping cart");
                    return;
                }
            }
        }

        CartNames.push(productName);
        CartQuantities.push(10);
        await client.db("Users").collection("Customers").updateOne({"name": customerName}, {$set: {"shoppingCart": Cart}});
        res.status(200).json("Successfully added to shopping cart");
        
    }
})


module.exports = router;