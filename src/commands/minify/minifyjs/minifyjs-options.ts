import { JsonObject, JsonProperty } from "json2typescript";

/**
 * Options pour la commande MinifyJs
 */
@JsonObject
export class MinifyJsConfigOptions  {

    constructor() { }

    @JsonProperty("src")
    private _src: string = undefined;

    get src(): string {
        return this._src;
    }

    @JsonProperty("outDir")
    private _outDir: string = undefined;

    get outDir(): string {
        return this._outDir;
    }

}

