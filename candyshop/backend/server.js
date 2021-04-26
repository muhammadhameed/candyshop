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
    app.use(express.static(path.join(__dirname, '../src/build/index.html')));
    console.log("blah")

    app.get('/', function(req, res) {
        //res.sendFile(path.resolve(__dirname,  "build", "Home.js"))
        res.sendFile(path.join(__dirname, '../src', 'build', 'index.html'));
        console.log("blah")
    });
}

if (process.env.NODE_ENV === "production")
{
    console.log("reached")
    var distDir = __dirname + "/dist/";
    app.use(express.static(path.join(distDir)));
    console.log("blah")

    app.get('/', function(req, res) {
        //res.sendFile(path.resolve(__dirname,  "build", "Home.js"))
        console.log("blahget")
        return res.redirect('/home'); //"https://candyscape.herokuapp.com/home/";
        //res.sendFile(path.join(__dirname, 'routes', 'customer.js'));
        
    });
}

const AdminRouter = require('./routes/admin');
const CustomersRouter = require('./routes/customers');
const DiscountRouter = require('./routes/discount');
const OrdersRouter = require('./routes/orders');
const ProductRouter = require('./routes/product');
const ReviewsRouter = require('./routes/reviews');
const ShoppingCartRouter = require('./routes/shoppingCart');


app.use('/admin', AdminRouter);
app.use('/customers', CustomersRouter);
app.use('/discount', DiscountRouter);
app.use('/orders', OrdersRouter);
app.use('/product', ProductRouter);
app.use('/reviews', ReviewsRouter);
app.use('/shoppingCart', ShoppingCartRouter);


app.get('/home', function(req, res) {
    res.sendFile(path.join(__dirname, 'Home.html'));
});

app.get('/homejs', function(req, res) {
    res.sendFile(path.join(__dirname, 'Home.js'));
});




app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})

