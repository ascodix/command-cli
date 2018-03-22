import { JsonObject, JsonProperty } from "json2typescript";

/**
 * Options pour la commande Check-Filename
 */
@JsonObject
export class CheckFilenameOptions  {

    constructor() { }

    @JsonProperty("dirFormat", String)
    private _dirFormat: string = undefined;

    @JsonProperty("fileFormats")
    private _fileFormats: string = undefined;

    @JsonProperty("exclude", [String])
    private _exclude: string[] = undefined;

    get dirFormat(): string {
        return this._dirFormat;
    }

    get fileFormats(): string {
        return this._fileFormats;
    }

    get exclude(): string[] {
        return this._exclude;
    }
}