/**
 * Entita košíku
 */
class Cart {
    /**
     * Identifikátor podle, kterého se identifikuje košík.
     */
    private _userId: number;
    /**
     * Obsahuje identifikátory produktů, které košík obsahuje.
     */
    private _productsIds: number[] = [];
    // test
    private _name: string;

    get userId(): number {
        return this._userId;
    }

    set userId(value: number) {
        this._userId = value;
    }

    get productsIds(): number[] {
        return this._productsIds;
    }

    set productsIds(value: number[]) {
        this._productsIds = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }
}

