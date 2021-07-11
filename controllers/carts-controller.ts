import {ICartsService} from "../services/interfaces";
import {WriteOpResult} from "mongodb";
import {deflateRawSync} from "zlib";

export {};

class CartsController {

    private CartsService: ICartsService;

    public constructor(CartsService: ICartsService) {
        this.CartsService = CartsService;
    }

    public async addProduct(req, res, next) {
        const cartResult = await this.CartsService.createCartIfNotExists(25);

        if(cartResult) {
        }  else {
            res.status(409);
            res.send("Již existuje");
        }
    }

}

module.exports = CartsController;