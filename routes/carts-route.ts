const express = require("express"),
      router = express.Router(),
      CartsController = require("../controllers/carts-controller");
const CartsService = require("../services/carts-service");

const initRouters = () => {
    const CartsServiceObj = new CartsService();
    const CartControllerObj = new CartsController(CartsServiceObj);

    router.get("/",  CartControllerObj.addProduct.bind(CartControllerObj));
}
initRouters();


module.exports = router;