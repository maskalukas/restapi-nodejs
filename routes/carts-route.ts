import {CartsService} from "../services/carts-service";
const express = require("express"),
      router = express.Router(),
      CartsController = require("../controllers/carts-controller");

const CartControllerObj = new CartsController(new CartsService());
router.get("/",  CartControllerObj.addProduct);

module.exports = router;