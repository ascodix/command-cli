/**
 * Option disponible pour une commande
 */
export class Option {

    protected readonly _name: string;
    protected readonly _type: any;
    protected readonly _default: String | Boolean;
    protected readonly _aliases: string[];
    protected readonly _description: string;

    /**
     * Constructeur
     *
     * @param {string} name le nom de l'option (ex: 'help')
     * @param {String | Boolean | Number} type le type de l'option (Boolean, String, Number)
     * @param {String | Boolean} def la valeur par défaut (false si pas de valeur par défaut)
     * @param {string[]} aliases les alias de l'option (ex: ['s'])
     * @param {string} description la description de l'option
     */
    constructor(name: string, type: any, def: String | Boolean, aliases: string[], description: string) {
        this._name = name;
        this._type = type;
        this._default = def;
        this._aliases = aliases;
        this._description = description;
    }

    get name(): string {
        return this._name;
    }

    get type(): any {
        return this._type;
    }

    get default(): String | Boolean {
        return this._default;
    }

    get aliases(): string[] {
        return this._aliases;
    }

    get description(): string {
        return this._description;
    }
}