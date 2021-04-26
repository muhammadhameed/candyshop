const express = require ('express');
const cors = require('cors');
require('dotenv').config();
// const {MongoClient} = require('mongodb');
const path = require('path');
const client = require('./routes/connection');


const app = express();
const port = process.env.PORT || 2000;

app.use(cors());
app.use (express.json());


async function connectToDb(){
    await client.connect();
    console.log(client.isConnected());
}
connectToDb();


if (process.env.NODE_ENV === "development")
{
    console.log("reached")
    var distDir = __dirname + "/dist/";
    app.use(express.static(path.join(__dirname, '/auth/Home.js')));
    console.log("blah")

    app.get('/', function(req, res) {
        //res.sendFile(path.resolve(__dirname,  "build", "Home.js"))
        res.sendFile(path.join(__dirname, 'auth', 'Home.js'));
        console.log("blah")
    });
}

if (process.env.NODE_ENV === "production")
{
    console.log("reached")
    var distDir = __dirname + "/dist/";
    app.use(express.static(path.join(__dirname, '/auth/Home.js')));
    console.log("blah")

    app.get('/', function(req, res) {
        //res.sendFile(path.resolve(__dirname,  "build", "Home.js"))
        res.sendFile(path.join(__dirname, 'auth', 'Home.js'));
        console.log("blah")
    });
}


const CustomersRouter = require('./routes/customers');
const AdminRouter = require('./routes/admin');
const ShoppingCartRouter = require('./routes/shoppingCart');
const ProductRouter = require('./routes/product');
const DiscountRouter = require('./routes/discount');
const OrdersRouter = require('./routes/orders');

app.use('/customers', CustomersRouter);
app.use('/admin', AdminRouter);
app.use('/shoppingCart', ShoppingCartRouter);
app.use('/product', ProductRouter);
app.use('/discount', DiscountRouter);
app.use('/orders', OrdersRouter);


// if(process.env.NODE_ENV === 'production'){
//     app.use(express.static ('candyshop/build'));

//     app.get('*', (req,res) => {
//         res.sendFile(path.join(_dirname, 'candyshop', 'build', 'index.html'));

//     }); 
// }

// app.use(express.static(path.join(_dirname, '../build')));
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../build'))
// })


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})

