
const{MongoClient} = require('mongodb') ;

async function main()
{
    
    const uri = "mongodb+srv://adeen_amer:Group12-SE-Candyscape@cluster0.csln9.mongodb.net/Users?retryWrites=true&w=majority"
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

    try
    {
        await client.connect();
        // await AddCustomer(client, "adeen","ade@gm.com","15674", 0312);
        // await AddCustomer(client, "ayan", "taby@xyz.com", "12345", 0323 );
        // await AddCustomer(client, "hameed", "meed@yp.com", "18105", 0343);
        // await AddProduct(client, "red candy", 23, 1000);
        // await AddProduct(client, "blue candy", 50, 1000);
        // await AddToShoppingCart(client, "adeen", "red candy", 5);
        // await AddToShoppingCart(client, "adeen", "blue candy", 5);
        // await UpdateShoppingCart(client, "adeen", "red candy", "add",  5);
        // await UpdateShoppingCart(client, "adeen", "blue candy", "subtract", 5);
        // await UpdateProduct(client, "red candy", "price", 5, "add");
        // await UpdateProduct(client, "blue candy", "quantity", 500, "subtract");
        await UpdateProduct(client, "red candy", "name", "fun candy");

    }
    catch(e)
    {
        console.error(e);
    }

    finally
    {
        await client.close();
    }
    
}

main().catch(console.error);

async function listDatabases(client){
    dblist = await client.db().admin().listDatabases();
    console.log("Database");
    dblist.databases.forEach(db => console.log(` - ${db.name}`));
};


async function AddCustomer(client, username, email, password, phoneNumber){
    if(typeof email === "undefined" || typeof password === "undefined" || typeof username === "undefined" || typeof phoneNumber === "undefined"){
        console.log("Please fill all spaces");
        return;
    }

    let found = await client.db("Users").collection("Customers").findOne({"email" : email});
    if(found !==null) {
        // console.log("User with this email already exists");
        res.send("User with this email already exists");
        return;
    }
    found = await client.db("Users").collection("Customers").findOne({"name" : username});
    if(found !==null) {
        console.log("User with this username already exists");
        return;
    }
    const doc = {"name" : username, "email":email, "password":password, "phoneNumber":phoneNumber};
    await client.db("Users").collection("Customers").insertOne(doc);
    console.log("Welcome", username, "!");
    
}

async function CustomerSignIn(client, email, password){
    if(typeof email === "undefined" || typeof password === "undefined"){
        console.log("Please fill all spaces");
        return;
    }
    let found = await client.db("Users").collection("Customers").findOne({"email":email, "password":password});
    if (found === null){
        console.log("Please enter your details again or sign up now");
        return;
    }
    console.log("You are signed in. Welcome", username);
}

async function AdminSignIn(client, email, password){
    if(typeof email === "undefined" || typeof password === "undefined"){
        console.log("Please fill all spaces");
        return;
    }
    let found = await client.db("Users").collection("Admin").findOne({"email":email, "password":password});
    if (found === null){
        console.log("Please enter your details again");
        return;
    }
    console.log("You are signed in. Welcome", username);
}


async function AddProduct(client, productName, price, quantity){
    let found = await client.db("Product").collection("Candy").findOne({"name" : productName});
    if (found !== null){
        console.log("A product with this name already exists");
        return;
    }
    await client.db("Product").collection("Candy").insertOne({"name":productName, "price":price, "quantity":quantity});
    console.log("Product successfully added");
}

async function UpdateProduct(client, productName, whatToChange, change, operation){
    let found = await client.db("Product"). collection("Candy").findOne({"name":productName});
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
    await client.db("Product").collection("Candy").updateOne({"_id": id}, {$set : found});
    console.log("Successfully updated product details");
}


async function AddToShoppingCart(client, customerName, productName, quantity){
    let found = await client.db("Users").collection("Customers").findOne({"name": customerName});
    let foundProduct = await client.db("Product").collection("Candy").findOne({"name":productName});
    price = foundProduct.price;

    if(typeof (found.shoppingCart) === "undefined"){
        let AddToCart = [{"name" : productName, "quantity":quantity, "price": price*quantity}];
        await client.db("Users").collection("Customers").updateOne({"name": customerName}, {$set: {"shoppingCart": AddToCart}});
        console.log("Successfully added to shopping cart");
        return;
    }

    let Cart = found.shoppingCart;  //this is the shopping cart already found in the database for that user
    for (let i =0; i<Cart.length; i++){ //this loop is used to see if the product has already been added to shopping cart
        if(Cart[i].name === productName){
            Cart[i].quantity = Cart[i].quantity + quantity;
            Cart[i].price = Cart[i].quantity * price;
            await client.db("Users").collection("Customers").updateOne({"name": customerName}, {$set: {"shoppingCart": Cart}});
            console.log("Successfully added to shopping cart"); 
            return;
        }
    }
    
    let AddToCart = {"name" : productName, "quantity":quantity, "price": price*quantity};
    Cart.push(AddToCart);
    await client.db("Users").collection("Customers").updateOne({"name": customerName}, {$set: {"shoppingCart": Cart}});
    console.log("Successfully added to shopping cart");
}


async function UpdateShoppingCart(client, customerName, productName, operation, quantityChange){
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
}