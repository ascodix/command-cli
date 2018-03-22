import { JsonObject, JsonProperty } from 'json2typescript';
import { ReporterOptions } from './reporter-options';

@JsonObject
export abstract class CommandConfig {

    @JsonProperty('reporters')
    protected _reporters: ReporterOptions[] = undefined;

    get reporters(): ReporterOptions[] {
        return this._reporters;
    }

    set reporters(value: ReporterOptions[]) {
        this._reporters = value;
    }
}