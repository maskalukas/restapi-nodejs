const mysqlQuery = require("../connections/mysql-query")
/**
 * Třída pro interakce s databází
 */
class ProductsRepository implements IProductsRepo {
    /**
     * Název tabulky
     */
    private readonly table = "products";

    /**
     * Vrací produkt podle identifikátoru
     * @param id = identifikátor produktu
     */
    public getProduct(id: number): Promise<Product> {
        return mysqlQuery.get(`SELECT * FROM ${this.table} WHERE id = ${id}`);
    }

    public setProductsFromJson(products: Product[]): Promise<boolean> {
        const valuesForQuery = products.map(productObj => {
            return [ productObj.name, productObj.type, productObj.price ]
        });
        return mysqlQuery.postMultiple(`INSERT INTO products (name, type, price) VALUES ?`, valuesForQuery.splice(0,40000))
    }


}

module.exports = ProductsRepository;