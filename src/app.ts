export {};
const express = require("express");
const mongoDbClient = require("./db/connections/mongodb");
const jobControlIncompletePurchases = require("./jobs/control-incomplete-purchases");
const cartRoutes = require("./routes/cart-routes");
const cartsRoutes = require("./routes/carts-routes");

const app = express();
const port = 8080;
app.listen(port,(err, ) => {
    console.log("Aplikace úspěšně spuštěna.");
});
mongoDbClient.connectDB();
jobControlIncompletePurchases.start();



// routes
app.use('/v1/cart', cartRoutes);
app.use('/v1/carts', cartsRoutes)

// ukočení připojení na databázi
process.on('SIGINT', function () {
    mongoDbClient.close();
    process.exit(2);
});