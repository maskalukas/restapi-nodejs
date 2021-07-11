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
}