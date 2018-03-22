import { CommandConfig } from '../command-config';
import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject
export class InitConfig extends CommandConfig {

    @JsonProperty("property1", String)
    private _property1: string = undefined;

    @JsonProperty("property2", String)
    private _property2: string = undefined;

    @JsonProperty("property3", String)
    private _property3: string = undefined;

    get property1(): string {
        return this._property1;
    }

    set property1(property1: string) {
        this._property1 = property1;
    }

    get property2(): string {
        return this._property2;
    }

    set property2(value: string) {
        this._property2 = value;
    }

    get property3(): string {
        return this._property3;
    }

    set property3(value: string) {
        this._property3 = value;
    }

}