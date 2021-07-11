const MongoClient = require("mongodb").MongoClient;

const url = 'mongodb://localhost:27017/test';
let _db, _client;
let ranTest = Math.random().toString();

/**
 * Připojení k databázi.
 */
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
/**
 * Vrací instanci databáze.
 */
const getDB = () => _db;
/**
 * Zavírá připojení k databázi.
 */
const close = () => _client.close();
module.exports = { connectDB, getDB, close, ranTest }