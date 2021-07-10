/**
 * Entita uživatele.
 */
class Customer {
    /**
     * Identifikátor zákazníka.
     */
    private _id: number;
    /**
     * Jméno zákazníka.
     */
    private _name: string;

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

}