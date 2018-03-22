import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject
export class Project {

    @JsonProperty('name', String)
    private _name: string = undefined;

    private _root: string;

    constructor() {

    }

    get root(): string {
        return this._root;
    }

    set root(value: string) {
        this._root = value;
    }

    get name(): string {
        return this._name;
    }

    set name(name: string) {
        this._name = name;
    }

}