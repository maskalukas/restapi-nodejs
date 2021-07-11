import {Schema} from "inspector";

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

    /**
     * Přidání nového produktu do košíku.
     * @param userId = Identifikátor pro nalezení košíku.
     * @param productId = Identifikátor produktu, který se vloží do košíku.
     */
    addProductToCart(userId: number, productId: number): Promise<TMongoCartDocument>;

    /**
     * Navýšení množství produktu o 1.
     * @param productId = Identifikátor produktu, u kterého proběhně navýšení množství.
     * @param incrementByNumber = O toto číslo se dané množství navýší či sníží.
     */
    changeQuantityOfProduct(productId: number, incrementByNumber: number): Promise<TMongoCartProductDocument>;
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

