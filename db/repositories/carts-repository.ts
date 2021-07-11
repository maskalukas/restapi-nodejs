import {ICartsRepo} from "./interfaces";
import {PushOperator, UpdateQuery, WriteOpResult} from "mongodb";

const mongoDbClient = require("../connections/mongodb");

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
    public getCartById(userId: number): Promise<TMongoCartDocument|null> {
        this.mongoDb = mongoDbClient.getDB();

        const cartDocument: TMongoCartDocument = {
            'userId': userId
        }

        return this.mongoDb.collection(this.collectionName).findOne(cartDocument);
    }

    /** @inheritdoc */
    public createCart(userId: number): Promise<WriteOpResult> {
        this.mongoDb = mongoDbClient.getDB();

        const NewCart: TMongoCartDocument = {
            userId: userId,
            products: []
        }

        return this.mongoDb.collection(this.collectionName).insertOne(NewCart)
    }

    /** @inheritDoc */
    addProductToCart(userId: number, productId: number): Promise<TMongoCartDocument> {
        this.mongoDb = mongoDbClient.getDB();

        const filter: TMongoCartDocument = { userId: userId };
        const pushObject: UpdateQuery<TMongoCartDocument> = {
            $push: {
                products: { quantity: 1, productId: productId }
            }
        };

        return this.mongoDb.collection(this.collectionName).updateOne(filter, pushObject)
    }

}

module.exports = CartsRepository;