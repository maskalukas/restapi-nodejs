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
    public async checkIfCartExists(userId: number): Promise<boolean> {
        const Cart = await this.CartsRepo.getCartById(userId);
        return !!Cart;
    }

    /** @inheritDoc **/
    public async addProductToCart(userId: number, productId: number): Promise<any> {
        const Cart = this.CartsRepo.createCart(userId)
    }

    /** @inheritDoc **/
    public async createCartIfNotExists(userId: number): Promise<WriteOpResult|false> {
        const exists = await this.checkIfCartExists(userId);
        if(!exists) {
            return this.CartsRepo.createCart(userId);
        } else {
            return new Promise((resolve, reject) => {
                resolve(false);
            })
        }
    }




}

module.exports = CartsService;