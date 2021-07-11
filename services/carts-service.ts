import {ICartsRepo} from "../db/repositories/interfaces";
import {WriteOpResult} from "mongodb";
import {ICartsService} from "./interfaces";
export {};
const CartsRepository = require("../db/repositories/carts-repository");

/**
 * Služba pro košíky.
 */
class CartsService implements ICartsService {

    private CartsRepo: ICartsRepo = new CartsRepository();

    /** @inheritDoc **/
    public async addProductToCart(userId: number, productId: number): Promise<any> {
        const cartForUser = await this.createCartIfNotExists(userId);

        if(cartForUser.products.some(product => product.productId === productId)) {

        } else {
            return  await this.CartsRepo.addProductToCart(userId, productId);
        }
    }

    /** @inheritDoc **/
    public async createCartIfNotExists(userId: number): Promise<TMongoCartDocument> {
        let cart: TMongoCartDocument = await this.CartsRepo.getCartById(userId);

        if(!cart) {
            const newCart = await this.CartsRepo.createCart(userId);
            const ops: TMongoCartDocument[] = newCart.ops;

            if(ops.length > 0) {
                return new Promise((resolve) => {
                    resolve({
                        userId: ops[0].userId,
                        products: ops[0].products
                    })
                });
            }
        } else {
            return new Promise((resolve, reject) => {
                resolve({
                    userId: cart.userId,
                    products: cart.products
                } as TMongoCartDocument);
            })
        }
    }




}

module.exports = CartsService;