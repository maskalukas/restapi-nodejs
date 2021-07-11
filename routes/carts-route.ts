import {IUserService} from "../services/interfaces";

const express = require("express"),
      router = express.Router(),
      CartsController = require("../controllers/carts-controller");
const CartsService = require("../services/carts-service");
const UserService = require("../services/user-service");

const initRouters = () => {
    const UserServiceIns: IUserService = UserService.getInstance();

    const CartsServiceIns = new CartsService(UserServiceIns);
    const CartControllerIns = new CartsController(CartsServiceIns);


    router.get("/v1/",  CartControllerIns.addProduct.bind(CartControllerIns));
    router.put("/:id/increment", CartControllerIns.increaseQuantity.bind(CartControllerIns));
    router.put("/:id/decrement", CartControllerIns.decreaseQuantity.bind(CartControllerIns));
    router.put("/:productId/quantity/:number", CartControllerIns.setNumberOfQuantity.bind(CartControllerIns))
}
initRouters();


module.exports = router;