import { JsonObject, JsonProperty } from "json2typescript";

/**
 * Options pour la commande HtmlHint
 */
@JsonObject
export class LintHtmlOptions  {

    constructor() { }

    @JsonProperty("options")
    private _options: string = undefined;

    get options(): string {
        return this._options;
    }

}