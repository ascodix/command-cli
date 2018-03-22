import { CommandConfig } from '../command-config';
import { JsonObject, JsonProperty } from "json2typescript";

export class CleanConfig extends CommandConfig {

    @JsonProperty("foldersToClean", [String])
    private _foldersToClean: string[] = undefined;

    get foldersToClean(): string[] {
        return this._foldersToClean;
    }
}