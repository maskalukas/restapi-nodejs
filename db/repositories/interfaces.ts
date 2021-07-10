/**
 * Interface pro repozitář produktů.
 */
interface IProductsRepo {
    /**
     * Vrací produkt podle identifikátoru.
     * @param id = Identifikátor produktu.
     */
    getProduct(id: number): Promise<Product>;
}

/**
 * Interface pro repozitář košíků.
 */
interface ICartsRepo {
    /**
     * Vytvoření nového košíku.
     * @param userId = Identifikátor košíku se vytvoří
     *                 podle identifikátoru uživatele.
     */
    createCart(userId: number): Promise<Cart>;

    /**
     * Najde v kolekci uživatelovo košík.
     * @param userId = Identifikátor pro nalezení košíku.
     */
    getCart(userId: number): Promise<Cart>;
}

/**
 * Interface pro repozitář
 */
interface IUserRepo {
    /**
     * Vrací zákazníka podle jeho identifikátoru.
     * @param userId = Identifikátor zákazníka.
     */
    getUserById(userId: number): Promise<Customer>;
}
