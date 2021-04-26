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


// if (process.env.NODE_ENV === "development")
// {
//     console.log("reached")
//     var distDir = __dirname + "/dist/";
//     app.use(express.static(path.join(__dirname, '../src/build/index.html')));
//     console.log("blah")

//     app.get('/', function(req, res) {
//         //res.sendFile(path.resolve(__dirname,  "build", "Home.js"))
//         res.sendFile(path.join(__dirname, '../src', 'build', 'index.html'));
//         console.log("blah")
//     });
// }
//sd
//lk

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

if (process.env.NODE_ENV === "production")
{
    // console.log("reached")
    // var distDir = __dirname + "/dist/";
    app.use(express.static('client/build'));
    console.log("blah")

    app.get('*', (req, res) => {
        //res.sendFile(path.resolve(__dirname,  "build", "Home.js"))
        console.log("blahget")
        //return res.redirect('/home'); //"https://candyscape.herokuapp.com/home/";
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
        res.redirect('/home');
        
    });
}

app.use('/home',express.static('client/build'))
app.use('/register',express.static('client/build'))
app.use('/shoppingCart',express.static('client/build'))
app.use('/create-promo',express.static('client/build'))
app.use('/customer-orders',express.static('client/build'))

app.use('/home-client',express.static('client/build'))
app.use('/adduser',express.static('client/build'))
app.use('/home-server',express.static('client/build'))
app.use('/menu160',express.static('client/build'))
app.use('/menu320',express.static('client/build'))

app.use('/menu500',express.static('client/build'))
app.use('/success',express.static('client/build'))
app.use('/menu',express.static('client/build'))
app.use('/add-product',express.static('client/build'))
app.use('/view-orders',express.static('client/build'))

app.use('/error',express.static('client/build'))
app.use('/change-customer-username',express.static('client/build'))
app.use('/change-admin-username',express.static('client/build'))
app.use('/registerAdmin',express.static('client/build'))
app.use('/login-admin',express.static('client/build'))

app.use('/login',express.static('client/build'))
app.use('/resetpassword',express.static('client/build'))
app.use('/forgot-password',express.static('client/build'))
app.use('/forgot-password-admin',express.static('client/build'))
app.use('/change-password',express.static('client/build'))

app.use('/change-password-admin',express.static('client/build'))
app.use('/view-admins',express.static('client/build'))






app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})

