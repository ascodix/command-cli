import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject
export class CompileLessConfigOptions {

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


