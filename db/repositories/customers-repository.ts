export {};
const mysqlQuery = require("../connections/mysql-query");

/**
 * Třída pro interakce s databází zákazníků.
 */
class CustomersRepository implements IUserRepo {
    /**
     * Název tabulky pro zákazníky.
     */
    private readonly tableName = "customers";

    /** @inheritDoc **/
    getUserById(userId: number): Promise<Customer> {
        return mysqlQuery.get(`SELECT * FROM ${this.tableName} WHERE id = ${userId}`);
    }

    /**
     * Naplnění databáze zákazníky.
     * @param customers = Objekty se zákazníky, který naplní databázi.
     */
    public setCustomersFromJson(customers: Customer[]): Promise<boolean> {
        const valuesForQuery = customers.map(customer => {
            return [ customer.name ]
        });

        return mysqlQuery.postMultiple(`INSERT INTO ${this.tableName} (name) VALUES ?`, valuesForQuery)
    }

}

module.exports = CustomersRepository;