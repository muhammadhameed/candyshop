const express = require ('express');
const cors = require('cors');
// const mongoose = require('mongoose');
require('dotenv').config();
const {MongoClient} = require('mongodb');

const app = express();
const port = process.env.port || 3000;

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


// mongoose.connect(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
// const connection = mongoose.connection;

// connection.once('open', () => {
//     console.log(`Connection established successfully`);
// })

const CustomersRouter = require('./routes/customers');
const AdminRouter = require('./routes/admin');
const ShoppingCartRouter = require('./routes/shoppingCart');
const ProductRouter = require('./routes/product');


app.use('/customers', CustomersRouter);
app.use('/admin', AdminRouter);
app.use('/shoppingCart', ShoppingCartRouter);
app.use('/product', ProductRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})

