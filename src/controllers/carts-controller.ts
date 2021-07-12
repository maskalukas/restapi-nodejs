import {ICartsService} from "../services/interfaces";
export {};
const Translator = require("../services/translator");
const ERROR_KEYS = require("../constants/error-keys");

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
        let result
        try {
            result = await this.CartsService.addProductToCart(Number(req.params.cartId), Number(req.params.productId));
        } catch (err) {
            console.error(err);
        }

        if(result === null) {
            res.status(409);
            res.send(Translator.getInstance().get("productInCartAlreadyExists"));
        } else {
            res.status(201);
            res.send(Translator.getInstance().get("productAddedToCart"));
        }
    }

    /**
     * Navýšení množství produktu o 1.
     */
    public async increaseQuantity(req, res, next) {
        let result: boolean;

        try {
            result = await  this.CartsService.increaseQuantityOfProductByOne(Number(req.params.cartId),Number(req.params.productId));
        } catch (err) {
            console.error(err);
        }

        if(result) {
            res.status(200);
            res.send(Translator.getInstance().get("productQuantityIncrementedSuccessfully"));
        } else {
            res.status(404);
            res.send(Translator.getInstance().get("resourceNotFound"));
        }
    }

    /**
     * Snížení množství o 1.
     */
    public async decreaseQuantity(req, res, next) {
        let result;

        try {
            result = await this.CartsService.decreaseQuantityOfProductByOne(Number(req.params.cartId),Number(req.params.productId));
        } catch (err) {
            console.error(err);
        }

        if(result instanceof Error) {
            if(result.name === ERROR_KEYS.errQuantityUnder1) {
                res.status(400);
            } else if(result.name === ERROR_KEYS.errProductNotFound) {
                res.status(404);
            }

            res.send(result.message);
        } else {
            res.status(200);
            res.send(Translator.getInstance().get("productQuantityDecrementedSuccessfully"));
        }
    }

    /**
     * Nastavení pevného množství produktu.
     */
    public async setNumberOfQuantity(req, res, next) {
        let result: boolean|Error;

        try {
            result = await this.CartsService.setExactNumberOfQuantitiesOfProduct(Number(req.params.cartId),Number(req.params.productId), Number(req.params.number));
        } catch (err) {
            console.error(err);
        }

        if(result instanceof Error) {

            if(result.name === ERROR_KEYS.errQuantityUnder1) {
                res.status(400);
                res.send(result.message);
            }
        } else if(result === false){
            res.status(404);
            res.send(Translator.getInstance().get("resourceNotFound"));
        }
        else {
            res.status(200);
            res.send(Translator.getInstance().get("productQuantitySetSuccess"));
        }
    }

    /**
     * Odstranění produktu z košíku.
     */
    public async removeProductFromCart(req, res, next) {
        let result: boolean;

        try {
            result = await this.CartsService.removeProductFromCart(Number(req.params.cartId),Number(req.params.productId));
        } catch (err) {
            console.error(err);
        }

        if(result) {
            res.status(200);
            res.send(Translator.getInstance().get("productRemovedFromCartSuccess"));
        } else {
            res.status(404);
            res.send(Translator.getInstance().get("resourceNotFound"));
        }
    }

    /**
     * Odstranění produktů z košíku.
     */
    public async removeAllProductsFromCart(req, res, next) {
        let result: boolean;

        try {
            result = await this.CartsService.removeAllProductsFromCart(Number(req.params.cartId));
        } catch (err) {
            console.error(err);
        }

        if(result) {
            res.status(200);
            res.send(Translator.getInstance().get("productsRemovedFromCartSuccess"));
        } else {
            res.status(404);
            res.send(Translator.getInstance().get("resourceNotFound"));
        }
    }

    /**
     * Nastavení nedokončený objednávky.
     */
    public async setIncompletePurchase(req, res, next) {
        let result: boolean;

        try {
            result = await this.CartsService.setIncompletePurchase(Number(req.params.cartId));
        } catch (err) {
            console.error(err);
        }

        if(result) {
            res.status(200);
            res.send(Translator.getInstance().get("setCartIncompletePurchase"));
        } else {
            res.status(404);
            res.send(Translator.getInstance().get("resourceNotFound"));
        }
    }

    /**
     * Vrací nedokončený objednávky.
     */
    public async getAllIncompletePurchases(req,res,next) {
        let result: TMongoCartDocument[] = [];

        try {
            result = await this.CartsService.getAllIncompletePurchaseCarts();
        } catch (err) {
            console.error(err)
        }

        res.send(result);
    }

    /**
     * Vrací všechny košíky.
     */
    public async getAllCarts(req,res, next) {
        let result: TMongoCartDocument[] = [];

        try {
            result = await this.CartsService.getAllCarts();
        } catch (err) {
            console.error(err);
        }

        res.send(result);
    }

    /**
     * Odstraní všechny košíky.

     */
    public async removeAllCarts(req,res,next) {
        try {
            await this.CartsService.removeAllCarts();
            res.status(200);
            res.send(Translator.getInstance().get("allCartsRemovedSuccess"));
        } catch (err) {
            res.status(500);
            res.send(err);
        }
    }
}

module.exports = CartsController;