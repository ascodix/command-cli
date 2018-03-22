import { CommandConfig } from '../command-config';
import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject
export class HelpConfig extends CommandConfig {

    @JsonProperty("property1", String)
    private _property1: string = undefined;

    get property1(): string {
        return this._property1;
    }

    set property1(property1: string) {
        this._property1 = property1;
    }
}