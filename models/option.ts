import {Argument} from "./argument";

export class Option extends Argument {

    protected readonly _name: string;
    protected readonly _type: any;
    protected readonly _default: String | Boolean;
    protected readonly _aliases: string[];
    protected readonly _description: string;

    constructor(name: string, type: any, def: String | Boolean, aliases: string[], description: string) {
        super('');

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