import {WriteOpResult} from "mongodb";

export interface ICartsService {
    /**
     * Přidání produktu do košíku.
     * Pokud košík neexistuje, tak se vytvoří.
     * Pokud se produkt již v košíku nachází, nestane se nic.
     * @param cartId = Identifikátor pro nalezení košíku.
     * @param productId = Identifikátor produktu, který se přidá do košíku.
     */
    addProductToCart(cartId: number, productId: number): Promise<false|TMongoCartDocument>;

    /**
     * Vytvoření nového košíku.
     * @param cartId = Identifikátor pro nalezení košíku.
     */
    createCartIfNotExists(cartId: number): Promise<WriteOpResult|TMongoCartDocument>;
    /**
     * Navýšení množství produktu o 1.
     * @param cartId = Identifikátor pro nalezení košíku.
     * @param productId = Identifikátor produktu, u kterého proběhně navýšení množství.
     */
    increaseQuantityOfProductByOne(cartId: number, productId: number): Promise<TMongoCartProductDocument>;

    /**
     * Snížení množství produktu o 1.
     * @param cartId = Identifikátor pro nalezení košíku.
     * @param productId = Identifikátor produktu, u kterého proběhně snížení množství.
     */
    decreaseQuantityOfProductByOne(cartId: number, productId: number): Promise<TMongoCartProductDocument>;

    /**
     * Nastaví přesně nové množství kusů produktu v košíku.
     * @param cartId = Identifikátor pro nalezení košíku.
     * @param productId = Identifikátor produktu u kterého proběhne nastavní množství.
     * @param newQuantity = Číslo na kolik se nastaví množství.
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

    /**
     * Informuje emailem zákazníka, že má nedokončenou objednávku.
     */
    informCustomersAboutIncomplePurchase(): Promise<boolean>;
}

