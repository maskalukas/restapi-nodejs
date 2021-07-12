const MongoClient = require("mongodb").MongoClient;

const url = 'mongodb://mongo:27017/carts';
let _db, _client;

/**
 * Připojení k databázi.
 */
const connectDB = async () => {
    try {
        MongoClient.connect(url, (err, client) => {
            _db = client.db('carts');
            _client = client;
            console.log("Připojení k databázi bylo úspěšné.")
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
module.exports = { connectDB, getDB, close }