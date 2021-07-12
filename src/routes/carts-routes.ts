export {};
const express = require("express"),
    router = express.Router(),
    CartsController = require("../controllers/carts-controller");
const CartsService = require("../services/carts-service");

/**
 * Inicializuje routes, controllers a service PRO VÍCE KOŠÍKŮ.
 */
const initRouters = () => {
    const CartsServiceIns = new CartsService();
    const CartControllerIns = new CartsController(CartsServiceIns);

    router.get("/incompletepurchase", CartControllerIns.getAllIncompletePurchases.bind(CartControllerIns));
    router.get("/",CartControllerIns.getAllCarts.bind(CartControllerIns));

    router.delete("/", CartControllerIns.removeAllCarts.bind(CartControllerIns));
}
initRouters();


module.exports = router;