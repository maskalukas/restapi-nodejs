import {ICartsService} from "../services/interfaces";
const Translator = require("../services/translator");
export {};

class CartsController {

    private CartsService: ICartsService;

    public constructor(CartsService: ICartsService) {
        this.CartsService = CartsService;
    }

    public async addProduct(req, res, next) {
        const result = await this.CartsService.addProductToCart(130, 53);
        res.send(result);
    }

    public async increaseQuantity(req, res, next) {
        const result = await  this.CartsService.increaseQuantityOfProductByOne(Number(req.params.cartId),Number(req.params.productId));
        res.send(result);
    }

    public async decreaseQuantity(req, res, next) {
        const result = await this.CartsService.decreaseQuantityOfProductByOne(Number(req.params.cartId),Number(req.params.productId));
        res.send(result);
    }

    public async setNumberOfQuantity(req, res, next) {
        const result = await this.CartsService.setExactNumberOfQuantitiesOfProduct(Number(req.params.cartId),Number(req.params.productId), Number(req.params.number));
        res.send(result);
    }

    public async removeProductFromCart(req, res, next) {
        const result = await this.CartsService.removeProductFromCart(Number(req.params.cartId),Number(req.params.productId));
        res.send(result);
    }


}

module.exports = CartsController;