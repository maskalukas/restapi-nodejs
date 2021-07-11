type TMongoCarDocument = {
    cartId: number;
    productsIds: { id: number; quantity: number; }
}