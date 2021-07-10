export {};
const mysqlQuery = require("../connections/mysql-query")
/**
 * Třída pro interakce s databází produktů.
 */
class ProductsRepository implements IProductsRepo {
    /**
     * Název tabulky.
     */
    private readonly tableName = "products";

    /** @inheritdoc */
    public getProduct(id: number): Promise<Product> {
        return mysqlQuery.get(`SELECT * FROM ${this.tableName} WHERE id = ${id}`);
    }

    public setProductsFromJson(products: Product[]): Promise<boolean> {
        const valuesForQuery = products.map(productObj => {
            return [ productObj.name, productObj.type, productObj.price ]
        });
        return mysqlQuery.postMultiple(`INSERT INTO ${this.tableName} (name, type, price) VALUES ?`, valuesForQuery.splice(0,40000))
    }


}

module.exports = ProductsRepository;