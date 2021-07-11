import {ICartsRepo} from "./interfaces";
import { UpdateQuery, UpdateWriteOpResult, WriteOpResult} from "mongodb";
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
    public getCartById(cartId: number): Promise<TMongoCartDocument|null> {
        this.setMongoDb();

        const cartDocument: TMongoCartDocument = {
            'cartId': cartId
        }

        return this.mongoDb
            .collection(this.collectionName)
            .findOne(cartDocument);
    }

    /** @inheritdoc */
    public createCart(cartId: number): Promise<WriteOpResult> {
        this.setMongoDb();

        const NewCart: TMongoCartDocument = {
            cartId: cartId,
            products: [],
            incompletePurchase: null
        }

        return this.mongoDb
            .collection(this.collectionName)
            .insertOne(NewCart)
    }

    /** @inheritDoc */
    public addProductToCart(cartId: number, productId: number): Promise<TMongoCartDocument> {
        this.setMongoDb();

        const filter: TMongoCartDocument = { cartId: cartId };
        const pushObject: UpdateQuery<TMongoCartDocument> = {
            $push: {
                products: { quantity: 1, productId: productId }
            }
        };

        return this.mongoDb
            .collection(this.collectionName)
            .updateOne(filter, pushObject)
    }

    /** @inheritDoc */
    public changeQuantityOfProduct(cartId: number,productId: number, incrementByNumber: number): Promise<UpdateWriteOpResult> {
        this.setMongoDb();

        const filter: TMongoCartDocument = {
            cartId: cartId,
            "products.productId": productId
        };
        const incrementObject: UpdateQuery<TMongoCartDocument> = {
            $inc: { "products.$.quantity": incrementByNumber }
        }

        return this.mongoDb
            .collection(this.collectionName)
            .updateOne(filter, incrementObject);
    }

    /** @inheritDoc */
    public setExactNumberOfQuantitiesOfProduct(cartId: number, productId: number, newQuantity: number): Promise<UpdateWriteOpResult> {
        this.setMongoDb();

        const filter: TMongoCartDocument = {
            cartId: cartId,
            "products.productId": productId
        };
        const setObject: UpdateQuery<TMongoCartDocument> = {
            $set: { "products.$.quantity": newQuantity }
        }

        return this.mongoDb
            .collection(this.collectionName)
            .updateOne(filter, setObject);
    }

    /** @inheritDoc */
    public removeProductFromCart(cartId: number, productId: number): Promise<UpdateWriteOpResult> {
        this.setMongoDb();

        const filter: TMongoCartDocument = {
            cartId: cartId
        };
        const pullObject: UpdateQuery<TMongoCartDocument> = {
            $pull: { products: { productId: productId } }
        }
        return this.mongoDb
            .collection(this.collectionName)
            .updateOne(filter, pullObject);
    }

    /** @inheritDoc */
    public setIncompletePurchase(cartId: number): Promise<UpdateWriteOpResult> {
        this.setMongoDb();

        const filter: TMongoCartDocument = {
            cartId: cartId
        };
        const setObject: UpdateQuery<TMongoCartDocument> = {
            $set: {
                incompletePurchase: true
            }
        }

        return this.mongoDb
            .collection(this.collectionName)
            .updateOne(filter, setObject)
    }

    /** @inheritDoc */
    public getAllIncompletePurchaseCarts(): Promise<TMongoCartDocument[]> {
        this.setMongoDb();

        return this.mongoDb
            .collection(this.collectionName)
            .find({ incompletePurchase: true } as TMongoCartDocument)
            .toArray();
    }

    /**
     * Pouze nastavuje instanci na propoperty mongoDB zde ve třídě.
     */
    private setMongoDb(): void {
        if(!this.mongoDb) {
            this.mongoDb = mongoDbClient.getDB();
        }
    }


}

module.exports = CartsRepository;