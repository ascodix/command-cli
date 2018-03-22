import { CommandConfig } from '../../command-config';
import { JsonObject, JsonProperty } from "json2typescript";

export class NgTemplateConvertEntries {

    @JsonProperty("path")
    private _path: string = undefined;

    get path(): string {
        return this._path;
    }

    @JsonProperty("content")
    private _content: string = undefined;

    get content(): string {
        return this._content;
    }
}

export class NgTemplateConvertConfig extends CommandConfig {

    @JsonProperty("entries", [String])
    private _entries: string[] = undefined;

    get entries(): string[] {
        return this._entries;
    }

    //@JsonProperty("module")
    //private _module: string = undefined;

    //get module(): string {
    //    return this._module;
    //}
}
