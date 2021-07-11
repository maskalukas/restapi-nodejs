import {Schema} from "inspector";

export {};
import {Cursor, WriteOpResult} from "mongodb";

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
     * Vytvoří nový košík.
     * @param cartId = Identifikátor košíku;
     */
    createCart(cartId: number): Promise<WriteOpResult>;

    /**
     * Najde v databázi uživatelovo košík.
     * @param cartId = Identifikátor pro nalezení košíku.
     */
    getCartById(cartId: number): Promise<TMongoCartDocument|null>;

    /**
     * Přidá nový produktu do košíku.
     * @param cartId = Identifikátor pro nalezení košíku.
     * @param productId = Identifikátor produktu, který se vloží do košíku.
     */
    addProductToCart(cartId: number, productId: number): Promise<TMongoCartDocument>;

    /**
     * Navýší množství produktu o nastavené číslo.
     * @param cartId = Identifikátor pro nalezení košíku.
     * @param productId = Identifikátor produktu, u kterého proběhně navýšení množství.
     * @param incrementByNumber = O toto číslo se dané množství navýší či sníží.
     */
    changeQuantityOfProduct(cartId: number, productId: number, incrementByNumber: number): Promise<TMongoCartProductDocument>;

    /**
     * Nastaví přesné množství produktu.
     * @param cartId = Identifikátor pro nalezení košíku.
     * @param productId = Identifikátor produktu u kterého se nastaví množství.
     * @param newQuantity = Nové množství kusů daného produktu v košíku.
     */
    setExactNumberOfQuantitiesOfProduct(cartId: number, productId: number, newQuantity: number): Promise<any>;

    /**
     * Odstraní produkt z košíku.
     * @param cartId = Identifikátor pro nalezení košíku.
     * @param productId = Identifikátor produktu, který se odstraní.
     */
    removeProductFromCart(cartId: number, productId: number): Promise<any>;

    /**
     * Nastaví v databázi záznam košíku na stav (true),
     * a to znamená, že si zákazník objednávku na poslední chvíli rozmyslel.
     * @param cartId = Identifikátor košíku.
     */
    setIncompletePurchase(cartId: number): Promise<any>;

    /**
     * Vrací všechny košíky u kterých bylo zjištěno,
     * že zákazník nedokončíl objednávku.
     */
    getAllIncompletePurchaseCarts(): Promise<TMongoCartDocument[]>;
}


