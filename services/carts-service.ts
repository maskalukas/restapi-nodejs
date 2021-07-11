export {};
const CartsRepository = require("../db/repositories/carts-repository");

/**
 * Služba pro košíky.
 */
class CartsService implements ICartsService {

    private CartsRepo: ICartsRepo = new CartsRepository();

    /** @inheritDoc **/
    public async checkIfCartExists(userId: number): Promise<boolean> {
        const Cart = await this.CartsRepo.getCartById(userId);
        return !!Cart;
    }

    /** @inheritDoc **/
    public async addProductToCart(userId: number, productId: number): Promise<any> {
        const Cart = this.CartsRepo.createCart(userId)
    }

    /** @inheritDoc **/
    public async createCartIfNotExists(userId: number): Promise<TMongoCarDocument|false> {
        if(!await this.checkIfCartExists(userId)) {
            return this.CartsRepo.createCart(userId);
        } else {
            return new Promise(() => false)
        }
    }




}

module.exports = CartsService;