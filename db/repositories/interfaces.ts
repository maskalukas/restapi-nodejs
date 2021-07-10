/**
 * Interface pro repozitář produktů
 */
interface IProductsRepo {
    /**
     * Vrací produkt podle identifikátoru
     * @param id = identifikátor produktu
     */
    getProduct(id: number): Promise<Product>;
}