import {ICartsRepo} from "../db/repositories/interfaces";
import {WriteOpResult} from "mongodb";
import {ICartsService} from "./interfaces";
export {};
const CartsRepository = require("../db/repositories/carts-repository");
const CustomerService = require("./customers-service");

/**
 * Služba pro košíky.
 */
class CartsService implements ICartsService {

    private CartsRepo: ICartsRepo = new CartsRepository();


    /** @inheritDoc **/
    public async addProductToCart(cartId: number, productId: number): Promise<false|TMongoCartDocument> {
        const cartForUser = await this.createCartIfNotExists(cartId);

        if(cartForUser.products.some(product => product.productId === productId)) {
            return new Promise((resolve) => resolve(null))
        } else {
            return this.CartsRepo.addProductToCart(cartId, productId);
        }
    }

    /** @inheritDoc **/
    public async createCartIfNotExists(cartId: number): Promise<TMongoCartDocument> {
        let cart: TMongoCartDocument = await this.CartsRepo.getCartById(cartId);

        if(!cart) {
            const newCart = await this.CartsRepo.createCart(cartId);
            const ops: TMongoCartDocument[] = newCart.ops;

            if(ops.length > 0) {
                return new Promise((resolve) => {
                    resolve({
                        cartId: ops[0].cartId,
                        products: ops[0].products
                    })
                });
            }
        } else {
            return new Promise((resolve, reject) => {
                resolve({
                    userId: cart.cartId,
                    products: cart.products
                } as TMongoCartDocument);
            })
        }
    }

    /** @inheritDoc */
    public increaseQuantityOfProductByOne(cartId: number, productId: number): Promise<TMongoCartProductDocument> {
        return this.CartsRepo.changeQuantityOfProduct(cartId,productId, 1);
    }

    /** @inheritDoc */
    public decreaseQuantityOfProductByOne(cartId: number,productId: number):  Promise<TMongoCartProductDocument> {
        return this.CartsRepo.changeQuantityOfProduct(cartId,productId, -1);
    }

    /** @inheritDoc */
    public setExactNumberOfQuantitiesOfProduct(cartId: number,productId: number, newQuantity: number): Promise<any> {
        return this.CartsRepo.setExactNumberOfQuantitiesOfProduct(cartId,productId, newQuantity);
    }

    /** @inheritDoc */
    public removeProductFromCart(cartId: number,productId: number): Promise<any> {
        return this.CartsRepo.removeProductFromCart(cartId,productId);
    }

    /** @inheritDoc  */
    public setIncompletePurchase(cartId: number): Promise<any> {
        return this.CartsRepo.setIncompletePurchase(cartId);
    }

    /** @inheritDoc */
    public getAllIncompletePurchaseCarts(): Promise<TMongoCartDocument[]> {
        return this.CartsRepo.getAllIncompletePurchaseCarts();
    }

    /** Pouze ukázková metoda! */
    public async informCustomersAboutIncomplePurchase(): Promise<boolean>  {
        const CustomersServiceIns = new CustomersService();

        const incompletePurchaseCarts = await this.getAllIncompletePurchaseCarts();
        const customersIds = incompletePurchaseCarts.map(x => x.cartId);

        const customers = await CustomersServiceIns.getCustomersByIds(customersIds);

        const customersEmails = customers.map(customer => {
            return "customer-email";
        });

        // Zde bych pak odeslal email zákazníkovi, ale podle zadání to není potřeba.

        return new Promise(resolve => resolve(true));
    }
}

module.exports = CartsService;