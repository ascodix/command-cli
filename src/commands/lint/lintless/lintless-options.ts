import { JsonObject, JsonProperty } from "json2typescript";

/**
 * Options pour la commande LessHint
 */
@JsonObject
export class LintLessOptions  {

    constructor() { }

    @JsonProperty("options")
    private _options: string = undefined;

    get options(): string {
        return this._options;
    }

}