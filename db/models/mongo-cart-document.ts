type TMongoCartProductDocument = {
    productId: number;
    quantity: number;
}

type TMongoCartDocument = {
    cartId?: number;
    products?: TMongoCartProductDocument[];
    incompletePurchase?: null|true;

    "products.productId"?: number;
}