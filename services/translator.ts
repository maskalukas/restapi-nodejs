/**
 * Překládání textů.
 * Singleton class
 */
class Translator {

    /**
     * Singleton instance.
     */
    private static instance: Translator;

    /**
     * Defaultní jazyk.
     */
    private readonly DEFAULT_LANG = "cz";

    /**
     * Aktuální jazyk pro aplikaci.
     */
    private CURRENT_LANG: string;

    /**
     * Objekt s překlady.
     */
    private languageData: { [key: string]: string };

    /**
     * Vrací instanci singleton třídy.
     */
    public static getInstance(): Translator {
        if(!Translator.instance) {
            Translator.instance = new Translator();
            Translator.instance.CURRENT_LANG = Translator.instance.DEFAULT_LANG;
            Translator.instance.languageData = require(`./langs/${Translator.instance.CURRENT_LANG}.js`);
        }

        return Translator.instance;
    }

    /**
     * Vrací překlad podle zadaného klíče.
     * @param key = Klíč podle kterého se najde překlad.
     */
    public get(key: keyof TLanguagesKeys): string|undefined {
        if(this.languageData[key]) {
            return this.languageData[key];
        } else {
            return undefined;
        }
    }


}

module.exports = Translator;