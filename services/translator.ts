class Translator {

    private static instance: Translator;

    private readonly DEFAULT_LANG = "cz";

    private CURRENT_LANG: string;

    private languageData: { [key: string]: string };

    public static getInstance(): Translator {
        if(!Translator.instance) {
            Translator.instance = new Translator();
            Translator.instance.CURRENT_LANG = Translator.instance.DEFAULT_LANG;
            Translator.instance.languageData = require(`./langs/${Translator.instance.CURRENT_LANG}.js`);
        }

        return Translator.instance;
    }

    public get(key: keyof TLanguagesKeys): string|undefined {
        if(this.languageData[key]) {
            return this.languageData[key];
        } else {
            return undefined;
        }
    }


}

module.exports = Translator;