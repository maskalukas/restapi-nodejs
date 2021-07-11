export {};
const express = require("express"),
    router = express.Router(),
    CartsController = require("../controllers/carts-controller");
const CartsService = require("../services/carts-service");

/**
 * Inicializuje routes, controllers a service
 */
const initRouters = () => {
    const CartsServiceIns = new CartsService();
    const CartControllerIns = new CartsController(CartsServiceIns);

    router.get("/incompletepurchase", CartControllerIns.getAllIncompletePurchases.bind(CartControllerIns));
}
initRouters();


module.exports = router;