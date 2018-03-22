import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject
export class ClassPath {

    @JsonProperty("className", String)
    private _className: string = undefined;

    @JsonProperty("path", String)
    private _path: string = undefined;

    get className(): string {
        return this._className;
    }

    set className(className: string) {
        this._className = className;
    }

    get path(): string {
        return this._path;
    }

    set path(path: string) {
        this._path = path;
    }
}