import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject
export class Project {

    @JsonProperty("name", String)
    private _name: string = undefined;

    get name(): string {
        return this._name;
    }

    set name(name: string) {
        this._name = name;
    }
}
