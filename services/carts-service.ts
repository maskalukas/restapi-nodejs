import {ICartsRepo} from "../db/repositories/interfaces";
import {ICartsService} from "./interfaces";
import {deflateRawSync} from "zlib";
import {BulkWriteResult, UpdateWriteOpResult} from "mongodb";
export {};
const CartsRepository = require("../db/repositories/carts-repository");
const CustomersService = require("./customers-service");

/**
 * Služba pro košíky.
 */
class CartsService implements ICartsService {

    /**
     * Databázový repozitář.
     */
    private CartsRepo: ICartsRepo = new CartsRepository();


    /** @inheritDoc **/
    public async addProductToCart(cartId: number, productId: number): Promise<false|TMongoCartDocument> {
        const cartForUser = await this.createCartIfNotExists(cartId);

        if(cartForUser.products.some(product => product.productId === productId)) {
            // Dokument už daný produkt obsahuje, a tak neprovádět žádnou akci.
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
    public async increaseQuantityOfProductByOne(cartId: number, productId: number): Promise<boolean> {
        const updateResult: UpdateWriteOpResult = await this.CartsRepo.changeQuantityOfProduct(cartId,productId, 1);
        return this.checkUpdate(updateResult);
    }

    /** @inheritDoc */
    public async decreaseQuantityOfProductByOne(cartId: number,productId: number):  Promise<boolean> {
        const updateResult: UpdateWriteOpResult = await this.CartsRepo.changeQuantityOfProduct(cartId,productId, -1);
        return this.checkUpdate(updateResult);
    }

    /** @inheritDoc */
    public async setExactNumberOfQuantitiesOfProduct(cartId: number,productId: number, newQuantity: number): Promise<boolean> {
        const updateResult = await this.CartsRepo.setExactNumberOfQuantitiesOfProduct(cartId,productId, newQuantity);
        return this.checkUpdate(updateResult);
    }

    /** @inheritDoc */
    public async removeProductFromCart(cartId: number,productId: number): Promise<boolean> {
        const updateResult = await this.CartsRepo.removeProductFromCart(cartId,productId);
        return this.checkUpdate(updateResult);
    }

    /** @inheritDoc  */
    public async setIncompletePurchase(cartId: number): Promise<any> {
        const updateResult = await this.CartsRepo.setIncompletePurchase(cartId);
        return this.checkUpdate(updateResult);
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

        // odeslání emailu
         customers.forEach(customer => {
            console.log(`Zákazníkovi s id: ${customer.cartId} byl odeslán email.`)
        });

        return new Promise(resolve => resolve(true));
    }

    private checkUpdate(updateResult: UpdateWriteOpResult): Promise<boolean> {
        return new Promise((resolve) => {
            if(updateResult.result.nModified === 1) {
                resolve(true);
            } else if(updateResult.result.n === 0) {
                resolve(false);
            }
        });
    }
}

module.exports = CartsService;