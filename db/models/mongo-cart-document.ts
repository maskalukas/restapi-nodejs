type TMongoCartProductDocument = {
    productId: number;
    quantity: number;
}

type TMongoCartDocument = {
    userId?: number;
    products?: TMongoCartProductDocument[];

    "products.productId"?: number;
}