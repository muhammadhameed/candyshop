const express = require ('express');
const cors = require('cors');
require('dotenv').config();
const {MongoClient} = require('mongodb');
const path = require('path');

const app = express();
const port = process.env.port || 5000;

app.use(cors());
app.use (express.json());

const uri = process.env.DB_URI;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

async function connectToDb(){
    await client.connect();
    console.log(client.isConnected());
}
connectToDb();


const CustomersRouter = require('./routes/customers');
const AdminRouter = require('./routes/admin');
const ShoppingCartRouter = require('./routes/shoppingCart');
const ProductRouter = require('./routes/product');
const SignInRouter = require('./routes/signin');

app.use('/customers', CustomersRouter);
app.use('/admin', AdminRouter);
app.use('/shoppingCart', ShoppingCartRouter);
app.use('/product', ProductRouter);
app.use('/signin', SignInRouter);


if(process.env.NODE_ENV === 'production'){
    app.use(express.static ('candyshop/build'));

    app.get('*', (req,res) => {
        res.sendFile(path.join(_dirname, 'candyshop', 'build', 'index.html'));

    }); 
}



app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})

