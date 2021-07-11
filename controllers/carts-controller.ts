import {ICartsService} from "../services/interfaces";
const Translator = require("../services/translator");
export {};

class CartsController {

    private CartsService: ICartsService;

    public constructor(CartsService: ICartsService) {
        this.CartsService = CartsService;
    }

    public async addProduct(req, res, next) {
        const result = await this.CartsService.addProductToCart(Number(req.params.cartId), Number(req.params.productId));
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

    public async setIncompletePurchase(req, res, next) {
        const result = await this.CartsService.setIncompletePurchase(Number(req.params.cartId));
        res.send(result);
    }

    public async test(req,res,next) {
        const rs = await this.CartsService.getAllIncompletePurchaseCarts();

        res.send("cus");
    }


}

module.exports = CartsController;