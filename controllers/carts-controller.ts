export {};

class CartsController {

    private CartsService: ICartsService;

    public constructor(CartsService: ICartsService) {
        this.CartsService = CartsService;
    }

    public async addProduct(req, res, next) {
        const cartResult: TMongoCarDocument|false = await this.CartsService.createCartIfNotExists(5);
        res.send(cartResult);
    }

}

module.exports = CartsController;