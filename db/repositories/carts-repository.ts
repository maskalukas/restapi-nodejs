import {ICartsRepo} from "./interfaces";
import {WriteOpResult} from "mongodb";

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
    public getCartById(userId: number): Promise<TMongoCartDocument|null> {
        this.mongoDb = mongoDbClient.getDB();

        const cartDocument: TMongoCartDocument = {
            '_userId': userId
        }

        return this.mongoDb.collection(this.collectionName).findOne(cartDocument);
    }

    /** @inheritdoc */
    public createCart(userId: number): Promise<WriteOpResult> {
        const NewCart = new Cart();
        NewCart.userId = userId;

        return this.mongoDb.collection(this.collectionName).insertOne(NewCart)
    }
}

module.exports = CartsRepository;