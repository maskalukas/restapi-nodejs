export {};
const express = require("express");
const ProductsRepository = require("./db/repositories/products-repository");
const mysqlPool = require("./db/connections/mysql");

// const jsons = require("./db/dataset/result.json");
const CartRepository = require("./db/repositories/carts-repository");

const app = express();
const port = 3000;


app.listen(port,() => {
    console.log("Started..+.");
});

app.get("/",async (req, res) => {
    const CartRepo = new CartRepository();
    const d = await CartRepo.getAllCarts();
    console.log(d);
    res.send("cau");
})

// ukočení připojení na databázi
process.on('SIGINT', function () {
    mysqlPool.end();
    mongoDbClient.close();
    process.exit(2);
});


// routes - products
//app.use('/products', products);
