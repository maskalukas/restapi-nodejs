const express = require("express"),
      router = express.Router(),
      CartsController = require("../controllers/carts-controller");
const CartsService = require("../services/carts-service");

const initRouters = () => {
    const CartsServiceIns = new CartsService();
    const CartControllerIns = new CartsController(CartsServiceIns);


    router.get("/v1/",  CartControllerIns.addProduct.bind(CartControllerIns));
    router.put("/:cartId/product/:productId/increment", CartControllerIns.increaseQuantity.bind(CartControllerIns));
    router.put("/:cartId/product/:productId/decrement", CartControllerIns.decreaseQuantity.bind(CartControllerIns));
    router.put("/:cartId//quantity/:number", CartControllerIns.setNumberOfQuantity.bind(CartControllerIns));
    router.delete("/:cartId/product/:productId", CartControllerIns.removeProductFromCart.bind(CartControllerIns))
}
initRouters();


module.exports = router;