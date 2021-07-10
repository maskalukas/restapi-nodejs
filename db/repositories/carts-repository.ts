const mongoDbClient = require("../connections/mongodb");

/**
 * Třída pro interakce s databází košíků.
 */
class CartsRepository implements ICartsRepo {
    /**
     * Instance mongodb databáze.
     */
    private mongoDb = mongoDbClient.getDB();
    /**
     * Název kolekce košíků v mongodb.
     */
    private readonly collectionName = "carts";

    /** @inheritdoc */
    public getCart(cartId: number): Promise<Cart> {
        return this.mongoDb.collection(this.collectionName).findOne({
            cartId: cartId
        });
    }

    /** @inheritdoc */
    public createCart(userId: number): Promise<Cart> {

        const NewCart = new Cart();
        NewCart.userId = userId;

        return this.mongoDb.collection(this.collectionName).insertOne(NewCart)
    }


}

module.exports = CartsRepository;