import {IUserService} from "../services/interfaces";

const express = require("express"),
      router = express.Router(),
      CartsController = require("../controllers/carts-controller");
const CartsService = require("../services/carts-service");
const UserService = require("../services/user-service");

const initRouters = () => {
    const UserServiceObj: IUserService = UserService.getInstance();
    const CartsServiceObj = new CartsService(UserServiceObj);
    const CartControllerObj = new CartsController(CartsServiceObj);

    router.get("/v1/",  CartControllerObj.addProduct.bind(CartControllerObj));
    router.get("/v1",  () => {
        console.log("cau")
    });
}
initRouters();


module.exports = router;