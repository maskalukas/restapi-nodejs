import {ICartsService} from "../services/interfaces";
export {};

/**
 * Controller pro košíky.
 */
class CartsController {
    /**
     * Služba pro košíky.
     */
    private CartsService: ICartsService;

    public constructor(CartsService: ICartsService) {
        this.CartsService = CartsService;
    }

    /**
     * Přidání produktu do košíku.
     */
    public async addProduct(req, res, next) {
        const result = await this.CartsService.addProductToCart(Number(req.params.cartId), Number(req.params.productId));
        res.send(result);
    }

    /**
     * Navýšení množství produktu o 1.
     */
    public async increaseQuantity(req, res, next) {
        const result = await  this.CartsService.increaseQuantityOfProductByOne(Number(req.params.cartId),Number(req.params.productId));
        res.send(result);
    }

    /**
     * Snížení množství o 1.
     */
    public async decreaseQuantity(req, res, next) {
        const result = await this.CartsService.decreaseQuantityOfProductByOne(Number(req.params.cartId),Number(req.params.productId));
        res.send(result);
    }

    /**
     * Nastavení pevného množství produktu.
     */
    public async setNumberOfQuantity(req, res, next) {
        const result = await this.CartsService.setExactNumberOfQuantitiesOfProduct(Number(req.params.cartId),Number(req.params.productId), Number(req.params.number));
        res.send(result);
    }

    /**
     * Odstranění produktu z košíku.
     */
    public async removeProductFromCart(req, res, next) {
        const result = await this.CartsService.removeProductFromCart(Number(req.params.cartId),Number(req.params.productId));
        res.send(result);
    }

    /**
     * Nastavení nedokončený objednávky.
     */
    public async setIncompletePurchase(req, res, next) {
        const result = await this.CartsService.setIncompletePurchase(Number(req.params.cartId));
        res.send(result);
    }
}

module.exports = CartsController;