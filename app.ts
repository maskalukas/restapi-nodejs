export {};
const express = require("express");
const ProductsRepository = require("./db/repositories/products-repository");
const mysqlPool = require("./db/connections/mysql");
// const jsons = require("./db/dataset/result.json");

const app = express();
const port = 3000;


app.listen(port,() => {
    console.log("Started...");
});

app.get("/",async (req, res) => {
    /**
    const ProductsRepo = new ProductsRepository();
    let d;
    try {
        d = await ProductsRepo.setProductsFromJson(jsons);
    } catch (err) {
        console.error(err);
    }

    res.send(d);
     **/
    const ProductsRepo = new ProductsRepository();
    const product: IProductsRepo = await ProductsRepo.getProduct(45);
    res.send(product);
})

// ukočení připojení na databázi
process.on('SIGINT', function () {
    mysqlPool.end();
    process.exit(2);
});


// routes - products
//app.use('/products', products);
