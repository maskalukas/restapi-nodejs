const mongoDbClient = require("../connections/mongodb");
const Cart = require("../models/Cart");

/**
 * Třída pro interakce s databází košíků.
 */
class CartsRepository implements ICartsRepo {
    /**
     * Instance mongodb databáze.
     */
    public mongoDb;
    /**
     * Název kolekce košíků v mongodb.
     */
    private readonly collectionName = "carts";


    /** @inheritdoc */
    public getCartById(cartId: number): Promise<TMongoCarDocument|null> {
        this.mongoDb = mongoDbClient.getDB();

        return this.mongoDb.collection(this.collectionName).findOne({
            cartId: cartId
        });
    }

    /** @inheritdoc */
    public createCart(userId: number): Promise<TMongoCarDocument> {

        const NewCart = new Cart();
        NewCart.userId = userId;

        return this.mongoDb.collection(this.collectionName).insertOne(NewCart)
    }
}

module.exports = CartsRepository;