/**
 * Fake služba.
 * Slouží zde jen pro představu.
 * Jinak by normálně měla interface,..
 */
class CustomersService {
    public getCustomersByIds(customerIds: number[]): Promise<[]> {
        // zde bysme např. mohli získat zákazníky
        return new Promise(resolve => resolve([]));
    }
}

module.exports = CustomersService;