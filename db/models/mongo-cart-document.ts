/**
 * Dokument ilustrující produkt v košíku.
 */
type TMongoCartProductDocument = {
    productId: number;
    quantity: number;
}

/**
 * Dokument ilustrující košík.
 */
type TMongoCartDocument = {
    cartId?: number;
    products?: TMongoCartProductDocument[];
    incompletePurchase?: null|true;

    "products.productId"?: number;
}