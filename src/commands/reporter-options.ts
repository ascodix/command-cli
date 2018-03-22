import { JsonObject, JsonProperty } from 'json2typescript';

/**
 * Options pour les rapports
 */
@JsonObject
export class ReporterOptions {

    constructor() { }

    @JsonProperty('name', String)
    private _name: string = undefined;

    @JsonProperty('path')
    private _path: string = undefined;

    @JsonProperty('extensionFile')
    private _extensionFile: string = undefined;


    get name(): string {
        return this._name;
    }

    get path(): string {
        return this._path;
    }

    get extensionFile(): string {
        return this._extensionFile;
    }
}