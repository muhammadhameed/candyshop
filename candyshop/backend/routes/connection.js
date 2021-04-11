const {MongoClient} = require('mongodb');
const uri = process.env.DB_URI || process.env.MONGODB_URI;

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });


module.exports = client;