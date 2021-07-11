export {};
/**
 * Entita košíku
 */
class Cart implements TMongoCartDocument {
    /**
     * Identifikátor podle, kterého se identifikuje košík.
     */
    private _userId: number;
    /**
     * Obsahuje identifikátory produktů, které košík obsahuje.
     */
    private _products: TMongoCartProductDocument[] = [];

    get userId(): number {
        return this._userId;
    }

    set userId(value: number) {
        this._userId = value;
    }

    get products(): TMongoCartProductDocument[] {
        return this._products;
    }

    set products(value: TMongoCartProductDocument[]) {
        this._products = value;
    }

}

module.exports = Cart;