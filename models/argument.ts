import {IParam} from "./i-param";

export class Argument implements IParam {

    private readonly _rawValue: string;

    constructor(rawValue: string) {
        this._rawValue = rawValue;
    }

    get rawValue(): string {
        return this._rawValue;
    }
}