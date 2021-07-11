export {};
import {WriteOpResult} from "mongodb";

/**
 * Interface pro repozitář produktů.
 */
export interface IProductsRepo {
    /**
     * Vrací produkt podle identifikátoru.
     * @param id = Identifikátor produktu.
     */
    getProduct(id: number): Promise<Product>;
}

/**
 * Interface pro repozitář košíků.
 */
export interface ICartsRepo {
    /**
     * Vytvoření nového košíku.
     * @param userId = Identifikátor košíku se vytvoří
     *                 podle identifikátoru uživatele.
     */
    createCart(userId: number): Promise<WriteOpResult>;

    /**
     * Najde v databázi uživatelovo košík.
     * @param userId = Identifikátor pro nalezení košíku.
     */
    getCartById(userId: number): Promise<TMongoCartDocument|null>;
}

/**
 * Interface pro repozitář
 */
export interface IUserRepo {
    /**
     * Vrací zákazníka podle jeho identifikátoru.
     * @param userId = Identifikátor zákazníka.
     */
    getUserById(userId: number): Promise<Customer>;
}
