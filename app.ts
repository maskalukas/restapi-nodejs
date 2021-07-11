export {};
const express = require("express");
const mysqlPool = require("./db/connections/mysql");
const mongoDbClient = require("./db/connections/mongodb");
const jobControlIncompletePurchases = require("./jobs/control-incomplete-purchases");
const cartRoutes = require("./routes/cart-routes");
const cartsRoutes = require("./routes/carts-routes");

const app = express();
const port = 3000;
app.listen(port);
mongoDbClient.connectDB();
jobControlIncompletePurchases.start();

// routes
app.use('/v1/cart', cartRoutes);
app.use('/v1/carts', cartsRoutes)

// ukočení připojení na databázi
process.on('SIGINT', function () {
    mysqlPool.end();
    mongoDbClient.close();
    process.exit(2);
});