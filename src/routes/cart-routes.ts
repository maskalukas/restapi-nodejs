const express = require("express"),
      router = express.Router(),
      CartsController = require("../controllers/carts-controller");
const CartsService = require("../services/carts-service");

/**
 * Inicializuje routes, controllers a service PRO JEDEN KOŠÍK.
 */
const initRouters = () => {
    const CartsServiceIns = new CartsService();
    const CartControllerIns = new CartsController(CartsServiceIns);

    router.post("/:cartId/product/:productId",  CartControllerIns.addProduct.bind(CartControllerIns));

    router.put("/:cartId/incompletepurchase", CartControllerIns.setIncompletePurchase.bind(CartControllerIns));
    router.put("/:cartId/product/:productId/increment", CartControllerIns.increaseQuantity.bind(CartControllerIns));
    router.put("/:cartId/product/:productId/decrement", CartControllerIns.decreaseQuantity.bind(CartControllerIns));
    router.put("/:cartId/product/:productId/quantity/:number", CartControllerIns.setNumberOfQuantity.bind(CartControllerIns));

    router.delete("/:cartId/product/:productId", CartControllerIns.removeProductFromCart.bind(CartControllerIns));
    router.delete("/:cartId", CartControllerIns.removeAllProductsFromCart.bind(CartControllerIns));

}
initRouters();


module.exports = router;