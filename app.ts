import {IUserService} from "./services/interfaces";

export {};
const express = require("express");
const mysqlPool = require("./db/connections/mysql");
const mongoDbClient = require("./db/connections/mongodb");

// const jsonsProducts = require("./db/dataset/result.json");
//const jsonsCustomers = require("./db/dataset/customers.json");

const cartsRoute = require("./routes/carts-route");
const UserService = require("./services/user-service");


const app = express();
const port = 3000;

app.use("/",(req, res, next) => {
    const UserServiceObj: IUserService = UserService.getInstance();
    UserServiceObj.setUserId(125);
    next();
})


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
app.use('/v1/carts', cartsRoute);
