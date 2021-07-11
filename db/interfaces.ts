type TMongoCartDocument = {
    "_userId"?: number;
    productsIds?: TMongoCartProductDocument[];
}

type TMongoCartProductDocument = {
    id: number;
    quantity: number;
}