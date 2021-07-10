const mongoDbClient = require("../connections/mongodb");

class CartsRepository implements ICartsRepo {

    private mongoDb = mongoDbClient.getDB();

    public getAllCarts(): Promise<Cart> {
        return this.mongoDb.collection("collection2").find().toArray();
    }

}

module.exports = CartsRepository;