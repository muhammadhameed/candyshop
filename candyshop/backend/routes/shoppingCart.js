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

    
    let found = await client.db("Users").collection("Customers").findOne({"name":customerName});
    

    let price = 0;
    for(let i = 0; i<found.shoppingCart.length; i++){
        price += found.shoppingCart[i].price;
    }

    let foundpOrder = await client.db("Orders").collection("Pending Orders").find({}).sort({_id:-1}).limit(1);
    let foundcOrder = await client.db("Orders").collection("Confirmed Orders").find({}).sort({_id:-1}).limit(1);
    var count = 1;
    let arrP = await foundpOrder.toArray();
    let arrC = await foundcOrder.toArray();
    
    if(typeof arrP[0]!== "undefined" && typeof arrC[0]!=="undefined"){
        count = Math.max( arrC[0].orderNumber, arrP[0].orderNumber) + 1;
    }
    else if(typeof arrP[0]!== "undefined"){
        count = arrP[0].orderNumber + 1;
    }
    else if(typeof arrc[0]!== "undefined"){
        count = arrC[0].orderNumber + 1;
    }

    let doc = {
        "orderNumber" : count,
        "customerName" : found.name,
        "products" : found.shoppingCart,
        "totalPrice" : price,
        "address" : address,
        "paymentDetails" : "Cash on Delivery",
        "date" : new Date()
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


 // make new implementation of shopping cart according to new front end
 // use quantity to find box. only one box at a time. front end will send box, arrays of products and the address
 //no other route of back end will be used
 //promo code also

router.route('/confirm').post(async (req, res) => {
    let customerName = req.body.customerName;
    let boxType = req.body.boxType;
    let names = req.body.names;
    let quantities = req.body.quantities;
    let address = req.body.address;
    let discountCode = req.body.discountCode;
    
    if (typeof address === "undefined"){
        res.status(400).json("Address is empty");
        return;
    }
    if (typeof names === "undefined"){
        res.status(400).json("Please enter name of products");
        return;
    }
    if (typeof quantities === "undefined"){
        res.status(400).json("Please enter quantities of products");
        return;
    }

    if (typeof discountCode !== "undefined"){
        let foundDiscount = await client.db('Discount').collection('New Discount').findOne({'discountCode' : discountCode});
        if (foundDiscount === null){
            res.status(400).json('Invalid promo code');
            return;
        }
        var foundBox = await client.db("Product").collection("Boxes").findOne({"quantity":boxType});
        var price = foundBox.price * (1 - foundDiscount.discount);     
    }
    else {
        var foundBox = await client.db("Product").collection("Boxes").findOne({"quantity":boxType});
        var price = foundBox.price; 
    }
  

    
    let foundpOrder = await client.db("Orders").collection("Pending Orders").find({}).sort({_id:-1}).limit(1);
    let foundcOrder = await client.db("Orders").collection("Confirmed Orders").find({}).sort({_id:-1}).limit(1);
    var count = 1;
    let arrP = await foundpOrder.toArray();
    let arrC = await foundcOrder.toArray();
    
    if(typeof arrP[0]!== "undefined" && typeof arrC[0]!=="undefined"){
        count = Math.max( arrC[0].orderNumber, arrP[0].orderNumber) + 1;
    }
    else if(typeof arrP[0]!== "undefined"){
        count = arrP[0].orderNumber + 1;
    }
    else if(typeof arrc[0]!== "undefined"){
        count = arrC[0].orderNumber + 1;
    }


    Cart = {"Box" : foundBox.name, 'name':names, 'quantity':quantities, 'price': price}

    let doc = {
        "orderNumber" : count,
        "customerName" : customerName,
        "products" : Cart,
        "totalPrice" : price,
        "address" : address,
        "paymentDetails" : "Cash on Delivery",
        "date" : new Date()
    };
    await client.db("Orders").collection("Pending Orders").insertOne(doc);

})



module.exports = router;