export {};
const express = require("express");
const mysqlPool = require("./db/connections/mysql");
const mongoDbClient = require("./db/connections/mongodb");

// const jsonsProducts = require("./db/dataset/result.json");
//const jsonsCustomers = require("./db/dataset/customers.json");

const cartsRoute = require("./routes/carts-route");


const app = express();
const port = 3000;


app.listen(port,() => {
    console.log("Started..+.");
});

app.get("/",async (req, res) => {
    res.send(mongoDbClient.ranTest);
})

// ukočení připojení na databázi
process.on('SIGINT', function () {
    mysqlPool.end();
    mongoDbClient.close();
    process.exit(2);
});


// routes - products
app.use('/carts', cartsRoute);
