const MongoClient = require("mongodb").MongoClient;

const url = 'mongodb://localhost:27017/test';
let _db, _client;
let ranTest = Math.random().toString();

const connectDB = async () => {
    try {
        MongoClient.connect(url, (err, client) => {
            _db = client.db('test');
            _client = client;
        });
    } catch (e) {
        throw e
    }
}

const getDB = () => _db;
const close = () => _client.close();

connectDB();

module.exports = { connectDB, getDB, close, ranTest }