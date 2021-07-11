type TMongoCartProductDocument = {
    productId: number;
    quantity: number;
}

type TMongoCartDocument = {
    cartId?: number;
    products?: TMongoCartProductDocument[];

    "products.productId"?: number;
}