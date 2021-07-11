export {};
const express = require("express");
const mysqlPool = require("./db/connections/mysql");
const mongoDbClient = require("./db/connections/mongodb");
const jobControlIncompletePurchases = require("./jobs/control-incomplete-purchases");
const cartsRoute = require("./routes/carts-route");

const app = express();
const port = 3000;
app.listen(port);
mongoDbClient.connectDB();
// jobControlIncompletePurchases.start();

// routes - products
app.use('/v1/cart', cartsRoute);

// ukočení připojení na databázi
process.on('SIGINT', function () {
    mysqlPool.end();
    mongoDbClient.close();
    process.exit(2);
});