import {CartsService} from "../services/carts-service";

class CartsController {

    private CartsService: CartsService;

    public constructor(CartsService: CartsService) {
        this.CartsService = CartsService;
    }

    public addProduct(req, res, next): void {
        res.send("CUUUS");
    }
}

module.exports = CartsController;