/**
 * Entita produktu.
 */
class Product {
    /**
     * Identifikátor produktu.
     */
    private _id: number;
    /**
     * Název produktu.
     */
    private _name: string;
    /**
     * Typ produktu.
     */
    private _type: string;
    /**
     * Cena produktu.
     */
    private _price: number;

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get type(): string {
        return this._type;
    }

    set type(value: string) {
        this._type = value;
    }

    get price(): number {
        return this._price;
    }

    set price(value: number) {
        this._price = value;
    }
}