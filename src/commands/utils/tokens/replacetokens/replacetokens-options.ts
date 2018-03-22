import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject
export class TokensFile {

    constructor() { }

    @JsonProperty("file", String)
    private _file: string = undefined;

    get file(): string {
        return this._file;
    }

    @JsonProperty("url", String)
    private _url: string = undefined;

    get url(): string {
        return this._url;
    }

    @JsonProperty("order", Number)
    private _order: number = undefined;

    get order(): number {
        return this.order;
    }
}

/**
 * Options pour la commande ReplaceTokens
 */
@JsonObject
export class ReplaceTokensOptions {

    constructor() { }

    @JsonProperty("tokenFiles", [TokensFile])
    private _tokenFiles: TokensFile[] = undefined;

    get tokenFiles(): TokensFile[] {
        return this._tokenFiles;
    }

}