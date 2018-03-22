import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject
export class Report {

    @JsonProperty('path', String)
    private _path: string = undefined;

    constructor() {

    }

    get path(): string {
        return this._path;
    }

    set name(path: string) {
        this._path = path;
    }

}