import {WriteOpResult} from "mongodb";

export interface ICartsService {
    /**
     * Přidání či navýšení produktu.
     * @param userId = Identifikátor pro nalezení košíku.
     * @param productId = Identifikátor produktu, který se přidá do košíku.
     */
    addProductToCart(userId: number, productId: number): Promise<boolean>;

    /**
     * Vytvoření nového košíku.
     * @param userId = Identifikátor košíku.
     */
    createCartIfNotExists(userId: number): Promise<WriteOpResult|TMongoCartDocument>;
    /**
     * Navýšení množství produktu o 1.
     * @param productId = Identifikátor produktu, u kterého proběhně navýšení množství.
     */
    increaseQuantityOfProductByOne(productId: number): Promise<TMongoCartProductDocument>;

    /**
     * Snížení množství produktu o 1.
     * @param productId = Identifikátor produktu, u kterého proběhně snížení množství.
     */
    decreaseQuantityOfProductByOne(productId: number): Promise<TMongoCartProductDocument>;

    /**
     * Nastaví přesně nové množství kusů produktu v košíku.
     * @param productId = Identifikátor produktu u kterého proběhne nastavní množství.
     * @param newQuantity = Číslo na kolik se nastaví množství.
     */
    setExactNumberOfQuantitiesOfProduct(productId: number, newQuantity: number): Promise<any>;
}

export interface IUserService {
    setUserId(userId: number);
    getUserId(): number;
}