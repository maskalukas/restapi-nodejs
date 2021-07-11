/**
 * Entita uživatele.
 * Slouží zde jen pro představu.
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
    /**
     * Email zákazníka.
     */
    private _email: string;
    
    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }


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