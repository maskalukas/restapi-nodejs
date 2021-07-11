import {ICartsService} from "../services/interfaces";
const Translator = require("../languages/translator");
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

}

module.exports = CartsController;